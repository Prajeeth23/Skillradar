import uuid
from sqlalchemy import Column, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    employee_id = Column(String(36), ForeignKey("employees.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    responsibilities = Column(Text, nullable=True)
    achievements = Column(Text, nullable=True)
    technologies = Column(String(500), nullable=True)  # Comma separated tags e.g. "Python, FastAPI, Docker"
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)

    # Relationships
    employee = relationship("Employee", back_populates="projects")
