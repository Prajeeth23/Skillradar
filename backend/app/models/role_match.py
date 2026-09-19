import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Text, DateTime, ForeignKey, JSON, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.base import Base


class RoleMatch(Base):
    __tablename__ = "role_matches"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id = Column(String(36), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    role_id = Column(String(36), ForeignKey("internal_roles.id", ondelete="CASCADE"), nullable=False, index=True)
    match_score = Column(Float, default=0.0, nullable=False, index=True)  # 0.0 to 100.0
    matching_skills = Column(JSON, default=list, nullable=False)
    missing_skills = Column(JSON, default=list, nullable=False)
    transferable_skills = Column(JSON, default=list, nullable=False)
    explanation = Column(Text, nullable=False)
    generated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    __table_args__ = (
        UniqueConstraint("employee_id", "role_id", name="uq_employee_role_match"),
    )

    # Relationships
    employee = relationship("Employee", back_populates="role_matches")
    role = relationship("InternalRole", back_populates="matches")
