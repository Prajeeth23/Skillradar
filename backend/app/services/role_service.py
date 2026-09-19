import uuid
from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.role import InternalRole
from app.models.role_skill import RoleSkill
from app.models.skill import Skill
from app.schemas.role import InternalRoleCreate, InternalRoleUpdate, InternalRoleRead, RoleSkillRead


class RoleService:
    @staticmethod
    def get_role_by_id(db: Session, role_id: str) -> InternalRole:
        role = db.query(InternalRole).filter(InternalRole.id == role_id).first()
        if not role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Internal role with id '{role_id}' not found.",
            )
        return role

    @staticmethod
    def list_roles(
        db: Session,
        organization_id: Optional[str] = None,
        status_filter: Optional[str] = "OPEN",
    ) -> List[InternalRoleRead]:
        query = db.query(InternalRole)
        if organization_id:
            query = query.filter(InternalRole.organization_id == organization_id)
        if status_filter:
            query = query.filter(InternalRole.status == status_filter)

        roles = query.order_by(InternalRole.created_at.desc()).all()
        return [RoleService.format_role_read(r) for r in roles]

    @staticmethod
    def create_role(
        db: Session,
        organization_id: str,
        role_in: InternalRoleCreate,
        created_by_user_id: Optional[str] = None,
    ) -> InternalRoleRead:
        role = InternalRole(
            id=str(uuid.uuid4()),
            organization_id=organization_id,
            title=role_in.title,
            department=role_in.department,
            description=role_in.description,
            requirements=role_in.requirements,
            status=role_in.status,
            created_by=created_by_user_id,
        )
        db.add(role)
        db.flush()

        # Add skill requirements
        for skill_spec in role_in.skills:
            # find or create canonical skill
            skill = db.query(Skill).filter(Skill.name.ilike(skill_spec.skill_name.strip())).first()
            if not skill:
                skill = Skill(
                    id=str(uuid.uuid4()),
                    name=skill_spec.skill_name.strip(),
                    category=skill_spec.category,
                )
                db.add(skill)
                db.flush()

            role_skill = RoleSkill(
                id=str(uuid.uuid4()),
                role_id=role.id,
                skill_id=skill.id,
                required_level=skill_spec.required_level,
                importance=skill_spec.importance,
            )
            db.add(role_skill)

        db.commit()
        db.refresh(role)
        return RoleService.format_role_read(role)

    @staticmethod
    def update_role(db: Session, role_id: str, update_in: InternalRoleUpdate) -> InternalRoleRead:
        role = RoleService.get_role_by_id(db, role_id)
        for field, val in update_in.model_dump(exclude_unset=True).items():
            setattr(role, field, val)
        db.commit()
        db.refresh(role)
        return RoleService.format_role_read(role)

    @staticmethod
    def format_role_read(role: InternalRole) -> InternalRoleRead:
        skill_reads = [
            RoleSkillRead(
                id=rs.id,
                skill_id=rs.skill_id,
                skill_name=rs.skill.name,
                category=rs.skill.category,
                required_level=rs.required_level,
                importance=rs.importance,
            )
            for rs in role.role_skills
        ]
        return InternalRoleRead(
            id=role.id,
            organization_id=role.organization_id,
            title=role.title,
            department=role.department,
            description=role.description,
            requirements=role.requirements,
            status=role.status,
            created_by=role.created_by,
            created_at=role.created_at,
            skills=skill_reads,
        )


role_service = RoleService()
