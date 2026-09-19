import uuid
from sqlalchemy import Column, String, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.base import Base


class RoleSkill(Base):
    __tablename__ = "role_skills"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    role_id = Column(String(36), ForeignKey("internal_roles.id", ondelete="CASCADE"), nullable=False, index=True)
    skill_id = Column(String(36), ForeignKey("skills.id", ondelete="CASCADE"), nullable=False, index=True)
    required_level = Column(Integer, default=3, nullable=False)  # 1 to 5
    importance = Column(String(30), default="MANDATORY", nullable=False)  # MANDATORY, PREFERRED, BONUS

    __table_args__ = (
        UniqueConstraint("role_id", "skill_id", name="uq_role_skill"),
    )

    # Relationships
    role = relationship("InternalRole", back_populates="role_skills")
    skill = relationship("Skill", back_populates="role_skills")
