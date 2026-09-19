from datetime import date
from typing import Optional, List
from pydantic import BaseModel, Field


class ProjectBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    description: str = Field(..., min_length=5)
    responsibilities: Optional[str] = None
    achievements: Optional[str] = None
    technologies: Optional[str] = None  # e.g. "FastAPI, PostgreSQL, React"
    start_date: Optional[date] = None
    end_date: Optional[date] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    responsibilities: Optional[str] = None
    achievements: Optional[str] = None
    technologies: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None


class ProjectRead(ProjectBase):
    id: str
    employee_id: str

    model_config = {"from_attributes": True}
