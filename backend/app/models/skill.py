import uuid
from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship
from app.db.base import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), unique=True, index=True, nullable=False)
    category = Column(String(100), default="Technical", nullable=False, index=True)
    description = Column(Text, nullable=True)

    # Relationships
    employee_skills = relationship("EmployeeSkill", back_populates="skill", cascade="all, delete-orphan")
    role_skills = relationship("RoleSkill", back_populates="skill", cascade="all, delete-orphan")
