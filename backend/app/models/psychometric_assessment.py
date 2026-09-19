import uuid
import enum
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.base import Base


class AssessmentStatus(str, enum.Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"


class TraitType(str, enum.Enum):
    LEADERSHIP = "LEADERSHIP"
    ADAPTABILITY = "ADAPTABILITY"
    ANALYTICAL_THINKING = "ANALYTICAL_THINKING"
    COLLABORATION = "COLLABORATION"


class PsychometricAssessment(Base):
    __tablename__ = "psychometric_assessments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id = Column(String(36), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    status = Column(Enum(AssessmentStatus), default=AssessmentStatus.PENDING, nullable=False, index=True)
    assessment_token = Column(String(64), unique=True, nullable=False, index=True)
    sent_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    completed_at = Column(DateTime, nullable=True)
    trait_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    employee = relationship("Employee", back_populates="psychometric_assessments")
    trait_scores = relationship("PsychometricTraitScore", back_populates="assessment", cascade="all, delete-orphan")


class PsychometricTraitScore(Base):
    __tablename__ = "psychometric_trait_scores"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    assessment_id = Column(
        String(36),
        ForeignKey("psychometric_assessments.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    trait = Column(Enum(TraitType), nullable=False, index=True)
    score = Column(Float, nullable=False)  # 0.0 to 100.0

    # Relationships
    assessment = relationship("PsychometricAssessment", back_populates="trait_scores")
