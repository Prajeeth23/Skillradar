from typing import List
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.role import InternalRole
from app.schemas.career import CareerChatResponse
from app.services.ai.groq_service import groq_service


class CareerAssistantService:
    @staticmethod
    def chat(db: Session, employee: Employee, message: str) -> CareerChatResponse:
        """Process conversational query grounded strictly in the employee's personal skill and project dossier."""
        # 1. Gather employee context
        explicit_skills = [es.skill.name for es in employee.skills if not es.is_hidden]
        hidden_skills = [es.skill.name for es in employee.skills if es.is_hidden]
        projects_summary = [f"{p.title}: {p.description[:80]}" for p in employee.projects[:3]]

        # Gather open roles in organization
        open_roles = (
            db.query(InternalRole)
            .filter(
                InternalRole.organization_id == employee.user.organization_id,
                InternalRole.status == "OPEN",
            )
            .limit(5)
            .all()
        )
        roles_summary = [f"- {r.title} ({r.department})" for r in open_roles]

        # 2. Try Groq AI Chat Completion
        ai_reply = None
        if groq_service.is_available():
            system_prompt = (
                "You are SkillRadar's AI Career Assistant. You are having a 1-on-1 career advisory chat "
                "with an employee.\n"
                "Your advice must be strictly grounded in the employee's profile data provided below.\n"
                "Always emphasize their discovered hidden/transferable skills that elevate them beyond their formal job title.\n"
                "Never disclose or discuss information about other employees.\n"
                "Be encouraging, concise, actionable, and professional."
            )

            context_msg = (
                f"Employee Name: {employee.user.name}\n"
                f"Current Job Title: {employee.current_job_title}\n"
                f"Department: {employee.department}\n"
                f"Explicit Skills: {', '.join(explicit_skills) if explicit_skills else 'None'}\n"
                f"Hidden/Transferable Skills Discovered: {', '.join(hidden_skills) if hidden_skills else 'None'}\n"
                f"Recent Projects:\n" + "\n".join(projects_summary) + "\n\n"
                f"Open Roles in Organization:\n" + "\n".join(roles_summary) + "\n\n"
                f"Employee asks: {message}"
            )

            ai_reply = groq_service.execute_chat_completion(
                system_prompt=system_prompt,
                user_message=context_msg,
                temperature=0.4,
            )

        if not ai_reply:
            # Deterministic conversational assistant fallback
            ai_reply = CareerAssistantService._heuristic_response(
                employee=employee,
                message=message,
                explicit_skills=explicit_skills,
                hidden_skills=hidden_skills,
                open_roles=[r.title for r in open_roles],
            )

        suggested_actions = [
            "Explore matching internal roles",
            "Run Divergence Engine on new projects",
            "View personalized skill gap plan",
        ]

        return CareerChatResponse(
            response=ai_reply,
            suggested_actions=suggested_actions,
        )

    @staticmethod
    def _heuristic_response(
        employee: Employee,
        message: str,
        explicit_skills: List[str],
        hidden_skills: List[str],
        open_roles: List[str],
    ) -> str:
        msg_lower = message.lower()

        if "hidden" in msg_lower or "discover" in msg_lower or "transferable" in msg_lower:
            if hidden_skills:
                skills_str = ", ".join(hidden_skills)
                return (
                    f"SkillRadar's Divergence Engine has identified hidden capabilities in **{skills_str}** from your recent project activities! "
                    f"These skills demonstrate that you operate well beyond the conventional boundaries of a {employee.current_job_title}."
                )
            else:
                return (
                    f"We haven't uncovered any hidden skills yet. Once you add detailed project achievements and collaboration notes, "
                    f"the Divergence Engine will scan for transferable capabilities!"
                )

        if "role" in msg_lower or "fit" in msg_lower or "opportunity" in msg_lower:
            roles_str = ", ".join(open_roles[:3]) if open_roles else "new openings currently being posted"
            return (
                f"Based on your profile as a {employee.current_job_title} and your combination of technical and cross-functional abilities, "
                f"you are well positioned to explore internal opportunities such as: **{roles_str}**."
            )

        if "learn" in msg_lower or "missing" in msg_lower or "gap" in msg_lower:
            return (
                f"To expand your internal mobility, navigate to the **Skill Gap** section and select a target role. "
                f"SkillRadar will pinpoint your exact competency delta and provide tailored learning projects."
            )

        return (
            f"Hello {employee.user.name}! As a {employee.current_job_title} in {employee.department}, you have "
            f"{len(explicit_skills)} registered core skills and {len(hidden_skills)} discovered hidden capabilities. "
            f"You can ask me about roles that fit your background, how to bridge skill gaps, or how your hidden talents unlock new career paths."
        )


career_assistant_service = CareerAssistantService()
