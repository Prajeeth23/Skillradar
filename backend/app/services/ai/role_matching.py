import uuid
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.employee import Employee
from app.models.role import InternalRole
from app.models.role_match import RoleMatch
from app.schemas.matching import CandidateMatchResult, RoleMatchesResponse
from app.services.ai.groq_service import groq_service
from app.services.notification_service import notification_service


class LLMMatchExplanation(BaseModel):
    match_score: float = Field(..., ge=0.0, le=100.0)
    matching_skills: List[str]
    missing_skills: List[str]
    transferable_skills: List[str]
    explanation: str = Field(..., description="Detailed explanation of why this employee matches this role, especially citing hidden/transferable skills.")
    evidence: List[str]


class RoleMatchingEngine:
    @staticmethod
    def match_role_candidates(
        db: Session,
        role_id: str,
        min_score: float = 40.0,
        limit: int = 10,
    ) -> RoleMatchesResponse:
        """Evaluate all eligible employees in the organization against an internal role."""
        role = db.query(InternalRole).filter(InternalRole.id == role_id).first()
        if not role:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Internal role not found.")

        # Fetch all organization employees
        employees = (
            db.query(Employee)
            .join(Employee.user)
            .filter(Employee.user.has(organization_id=role.organization_id))
            .all()
        )

        match_results: List[CandidateMatchResult] = []

        for emp in employees:
            match_data = RoleMatchingEngine.evaluate_candidate(db, emp, role)
            if match_data.match_score >= min_score:
                match_results.append(match_data)

        # Sort descending by match score
        match_results.sort(key=lambda x: x.match_score, reverse=True)
        top_matches = match_results[:limit]

        return RoleMatchesResponse(
            role_id=role.id,
            role_title=role.title,
            total_candidates_evaluated=len(employees),
            top_matches=top_matches,
        )

    @staticmethod
    def evaluate_candidate(
        db: Session,
        employee: Employee,
        role: InternalRole,
    ) -> CandidateMatchResult:
        """Compute score and explainable match between an employee and a target role."""
        role_skills = {rs.skill.name.lower(): rs for rs in role.role_skills}
        emp_skills = {es.skill.name.lower(): es for es in employee.skills}

        matching_skill_names = []
        missing_skill_names = []
        transferable_skill_names = []
        evidence_list = []

        total_weight = 0.0
        acquired_weight = 0.0

        for r_name, r_spec in role_skills.items():
            weight = 3.0 if r_spec.importance == "MANDATORY" else (2.0 if r_spec.importance == "PREFERRED" else 1.0)
            total_weight += weight

            # Check if employee has this skill or related
            matched_key = None
            for e_name in emp_skills.keys():
                if r_name in e_name or e_name in r_name:
                    matched_key = e_name
                    break

            if matched_key:
                e_spec = emp_skills[matched_key]
                matching_skill_names.append(e_spec.skill.name)
                # Level ratio
                level_ratio = min(1.0, e_spec.proficiency / max(1, r_spec.required_level))
                acquired_weight += weight * level_ratio
                if e_spec.evidence:
                    evidence_list.append(e_spec.evidence)
            else:
                missing_skill_names.append(r_spec.skill.name)

        # Check for transferable / hidden skills that boost candidate profile
        for e_name, e_spec in emp_skills.items():
            if e_spec.is_hidden:
                transferable_skill_names.append(e_spec.skill.name)
                if e_spec.evidence and e_spec.evidence not in evidence_list:
                    evidence_list.append(e_spec.evidence)

        # Base algorithmic score
        if total_weight > 0:
            base_score = (acquired_weight / total_weight) * 80.0
        else:
            base_score = 50.0

        # Hidden skills bonus (up to 20 points)
        hidden_bonus = min(20.0, len(transferable_skill_names) * 5.0)
        computed_score = round(min(98.0, base_score + hidden_bonus), 1)

        # Check for optional completed psychometric trait summary
        trait_summary: Optional[str] = None
        for pa in getattr(employee, "psychometric_assessments", []):
            if getattr(pa, "status", None) and pa.status.value == "COMPLETED" and pa.trait_summary:
                trait_summary = pa.trait_summary
                break

        # Generate Explainable Match Reasoning via Groq or Deterministic Fallback
        ai_explanation = None
        if groq_service.is_available():
            ai_explanation = RoleMatchingEngine._generate_ai_explanation(
                employee=employee,
                role=role,
                match_score=computed_score,
                matching_skills=matching_skill_names,
                missing_skills=missing_skill_names,
                transferable_skills=transferable_skill_names,
                trait_summary=trait_summary,
            )

        if not ai_explanation:
            ai_explanation = RoleMatchingEngine._generate_heuristic_explanation(
                employee_name=employee.user.name,
                job_title=employee.current_job_title,
                role_title=role.title,
                match_score=computed_score,
                matching=matching_skill_names,
                missing=missing_skill_names,
                transferable=transferable_skill_names,
                trait_summary=trait_summary,
            )

        # Persist or update RoleMatch record
        role_match = (
            db.query(RoleMatch)
            .filter(RoleMatch.employee_id == employee.id, RoleMatch.role_id == role.id)
            .first()
        )
        if not role_match:
            role_match = RoleMatch(
                id=str(uuid.uuid4()),
                employee_id=employee.id,
                role_id=role.id,
                match_score=computed_score,
                matching_skills=matching_skill_names,
                missing_skills=missing_skill_names,
                transferable_skills=transferable_skill_names,
                explanation=ai_explanation,
                generated_at=datetime.now(timezone.utc),
            )
            db.add(role_match)
        else:
            role_match.match_score = computed_score
            role_match.matching_skills = matching_skill_names
            role_match.missing_skills = missing_skill_names
            role_match.transferable_skills = transferable_skill_names
            role_match.explanation = ai_explanation
            role_match.generated_at = datetime.now(timezone.utc)

        db.commit()

        # Trigger notification if strong match
        if computed_score >= 70.0:
            notification_service.notify_role_match(
                db=db,
                employee=employee,
                role=role,
                match_score=computed_score,
            )

        return CandidateMatchResult(
            employee_id=employee.id,
            employee_name=employee.user.name,
            current_job_title=employee.current_job_title,
            department=employee.department,
            match_score=computed_score,
            matching_skills=matching_skill_names,
            missing_skills=missing_skill_names,
            transferable_skills=transferable_skill_names,
            explanation=ai_explanation,
            evidence=evidence_list[:4],
            generated_at=datetime.now(timezone.utc),
        )

    @staticmethod
    def _generate_ai_explanation(
        employee: Employee,
        role: InternalRole,
        match_score: float,
        matching_skills: List[str],
        missing_skills: List[str],
        transferable_skills: List[str],
        trait_summary: Optional[str] = None,
    ) -> Optional[str]:
        system_prompt = (
            "You are the Talent Matching Explainer for SkillRadar. "
            "Your purpose is to answer: 'Why does this employee match this role?'\n"
            "Highlight why their demonstrated experience and especially their HIDDEN/TRANSFERABLE skills make them uniquely qualified, "
            "even if their nominal title differs from the target role. Write 2-3 concise, compelling sentences."
        )

        trait_line = f"Psychometric Traits: {trait_summary}\n" if trait_summary else ""

        user_prompt = (
            f"Candidate: {employee.user.name} (Current Title: {employee.current_job_title})\n"
            f"Target Role: {role.title} ({role.department})\n"
            f"Calculated Match Score: {match_score}%\n"
            f"Matching Skills: {', '.join(matching_skills) if matching_skills else 'None'}\n"
            f"Missing Skills: {', '.join(missing_skills) if missing_skills else 'None'}\n"
            f"Hidden/Transferable Skills: {', '.join(transferable_skills) if transferable_skills else 'None'}\n"
            f"{trait_line}\n"
            f"Explain why this employee is a compelling candidate."
        )

        return groq_service.execute_chat_completion(
            system_prompt=system_prompt,
            user_message=user_prompt,
            temperature=0.3,
        )

    @staticmethod
    def _generate_heuristic_explanation(
        employee_name: str,
        job_title: str,
        role_title: str,
        match_score: float,
        matching: List[str],
        missing: List[str],
        transferable: List[str],
        trait_summary: Optional[str] = None,
    ) -> str:
        matching_text = f"core competencies in {', '.join(matching[:3])}" if matching else "adjacent project experience"
        hidden_text = (
            f" Furthermore, discovered hidden capabilities in {', '.join(transferable[:2])} bridge the functional requirements."
            if transferable
            else ""
        )
        trait_text = (
            f" Psychometric evaluation highlights: {trait_summary}"
            if trait_summary
            else ""
        )
        return (
            f"{employee_name} matches {match_score:.1f}% for '{role_title}'. "
            f"Despite formally holding the title '{job_title}', demonstrated {matching_text} directly align with role demands.{hidden_text}{trait_text}"
        )


role_matching_engine = RoleMatchingEngine()
