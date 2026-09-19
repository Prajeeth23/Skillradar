import uuid
from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.employee import Employee
from app.models.role import InternalRole
from app.models.skill import Skill
from app.models.skill_gap import SkillGap
from app.models.learning_recommendation import LearningRecommendation
from app.schemas.skill_gap import (
    SkillGapItem,
    DevelopmentArea,
    SkillGapAnalysisResponse,
)


class SkillGapService:
    @staticmethod
    def analyze_gaps(
        db: Session,
        employee_id: str,
        target_role_id: str,
    ) -> SkillGapAnalysisResponse:
        employee = db.query(Employee).filter(Employee.id == employee_id).first()
        if not employee:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee not found.")

        role = db.query(InternalRole).filter(InternalRole.id == target_role_id).first()
        if not role:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Target role not found.")

        emp_skills_map = {es.skill.name.lower(): es for es in employee.skills}

        existing_skills: List[str] = []
        missing_skills: List[str] = []
        gap_items: List[SkillGapItem] = []
        development_areas: List[DevelopmentArea] = []

        total_req_points = 0
        current_points = 0

        # Clear previous gaps for this employee & role
        db.query(SkillGap).filter(
            SkillGap.employee_id == employee.id,
            SkillGap.target_role_id == role.id,
        ).delete()

        for rs in role.role_skills:
            req_skill_name = rs.skill.name
            req_level = rs.required_level
            importance = rs.importance
            total_req_points += req_level

            # Check if employee has this skill
            matched_key = None
            for es_name in emp_skills_map.keys():
                if req_skill_name.lower() in es_name or es_name in req_skill_name.lower():
                    matched_key = es_name
                    break

            if matched_key:
                cur_es = emp_skills_map[matched_key]
                cur_level = cur_es.proficiency
                existing_skills.append(req_skill_name)
            else:
                cur_level = 0
                missing_skills.append(req_skill_name)

            current_points += min(cur_level, req_level)
            gap = max(0, req_level - cur_level)

            if gap >= 2 or (gap > 0 and importance == "MANDATORY"):
                priority = "HIGH"
            elif gap == 1:
                priority = "MEDIUM"
            else:
                priority = "LOW"

            gap_item = SkillGapItem(
                skill_name=req_skill_name,
                category=rs.skill.category,
                current_level=cur_level,
                required_level=req_level,
                gap_level=gap,
                priority=priority,
            )
            gap_items.append(gap_item)

            # Persist SkillGap
            skill_gap_row = SkillGap(
                id=str(uuid.uuid4()),
                employee_id=employee.id,
                target_role_id=role.id,
                skill_id=rs.skill_id,
                current_level=cur_level,
                required_level=req_level,
                gap_level=gap,
                priority=priority,
            )
            db.add(skill_gap_row)
            db.flush()

            # If gap > 0, generate LearningRecommendation
            if gap > 0:
                rec_title = f"Mastering {req_skill_name} for {role.title}"
                rec_desc = (
                    f"Bridge your gap from level {cur_level} to required level {req_level}. "
                    f"Engage in internal hands-on projects and tutorials covering {req_skill_name}."
                )
                res_type = "COURSE" if gap >= 2 else "PROJECT"

                rec_row = LearningRecommendation(
                    id=str(uuid.uuid4()),
                    employee_id=employee.id,
                    skill_gap_id=skill_gap_row.id,
                    title=rec_title,
                    description=rec_desc,
                    resource_type=res_type,
                    priority=priority,
                )
                db.add(rec_row)

                development_areas.append(
                    DevelopmentArea(
                        title=rec_title,
                        description=rec_desc,
                        resource_type=res_type,
                        priority=priority,
                    )
                )

        db.commit()

        readiness = round((current_points / max(1, total_req_points)) * 100.0, 1)

        return SkillGapAnalysisResponse(
            employee_id=employee.id,
            employee_name=employee.user.name,
            target_role_id=role.id,
            target_role_title=role.title,
            readiness_score=readiness,
            existing_skills=existing_skills,
            missing_skills=missing_skills,
            skill_gaps=gap_items,
            recommended_development_areas=development_areas,
        )


skill_gap_service = SkillGapService()
