import uuid
from sqlalchemy import Column, String, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.base import Base


class SkillGap(Base):
    __tablename__ = "skill_gaps"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id = Column(String(36), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    target_role_id = Column(String(36), ForeignKey("internal_roles.id", ondelete="CASCADE"), nullable=False, index=True)
    skill_id = Column(String(36), ForeignKey("skills.id", ondelete="CASCADE"), nullable=False, index=True)
    current_level = Column(Integer, default=0, nullable=False)
    required_level = Column(Integer, default=3, nullable=False)
    gap_level = Column(Integer, default=0, nullable=False)
    priority = Column(String(20), default="MEDIUM", nullable=False)  # HIGH, MEDIUM, LOW

    __table_args__ = (
        UniqueConstraint("employee_id", "target_role_id", "skill_id", name="uq_emp_role_skill_gap"),
    )

    # Relationships
    employee = relationship("Employee", back_populates="skill_gaps")
    role = relationship("InternalRole", back_populates="skill_gaps")
    skill = relationship("Skill")
    learning_recommendations = relationship("LearningRecommendation", back_populates="skill_gap", cascade="all, delete-orphan")
