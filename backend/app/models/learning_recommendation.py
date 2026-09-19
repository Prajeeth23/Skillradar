import uuid
from sqlalchemy import Column, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class LearningRecommendation(Base):
    __tablename__ = "learning_recommendations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id = Column(String(36), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    skill_gap_id = Column(String(36), ForeignKey("skill_gaps.id", ondelete="CASCADE"), nullable=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    resource_type = Column(String(50), default="COURSE", nullable=False)  # COURSE, PROJECT, MENTORSHIP, CERTIFICATION
    priority = Column(String(20), default="MEDIUM", nullable=False)  # HIGH, MEDIUM, LOW

    # Relationships
    employee = relationship("Employee", back_populates="learning_recommendations")
    skill_gap = relationship("SkillGap", back_populates="learning_recommendations")
