import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Text, Boolean, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.base import Base


class EmployeeSkill(Base):
    __tablename__ = "employee_skills"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id = Column(String(36), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    skill_id = Column(String(36), ForeignKey("skills.id", ondelete="CASCADE"), nullable=False, index=True)
    proficiency = Column(Integer, default=3, nullable=False)  # Scale 1-5
    confidence = Column(Float, default=1.0, nullable=False)  # 0.0 to 1.0
    source = Column(String(50), default="project", nullable=False)  # resume, project, certification, AI_inferred, HR_added
    evidence = Column(Text, nullable=True)
    is_hidden = Column(Boolean, default=False, nullable=False, index=True)  # True = discovered by Divergence Engine
    last_updated = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint("employee_id", "skill_id", name="uq_employee_skill"),
    )

    # Relationships
    employee = relationship("Employee", back_populates="skills")
    skill = relationship("Skill", back_populates="employee_skills")
