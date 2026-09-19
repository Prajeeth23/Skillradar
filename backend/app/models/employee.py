import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    employee_code = Column(String(50), unique=True, nullable=False, index=True)
    department = Column(String(100), nullable=False, index=True)
    current_job_title = Column(String(150), nullable=False, index=True)
    years_of_experience = Column(Float, default=0.0, nullable=False)
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # Relationships
    user = relationship("User", back_populates="employee")
    projects = relationship("Project", back_populates="employee", cascade="all, delete-orphan")
    skills = relationship("EmployeeSkill", back_populates="employee", cascade="all, delete-orphan")
    role_matches = relationship("RoleMatch", back_populates="employee", cascade="all, delete-orphan")
    skill_gaps = relationship("SkillGap", back_populates="employee", cascade="all, delete-orphan")
    learning_recommendations = relationship("LearningRecommendation", back_populates="employee", cascade="all, delete-orphan")
    psychometric_assessments = relationship("PsychometricAssessment", back_populates="employee", cascade="all, delete-orphan")
