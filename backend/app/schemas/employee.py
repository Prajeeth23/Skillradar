from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from app.schemas.project import ProjectRead
from app.schemas.skill import EmployeeSkillRead


class EmployeeBase(BaseModel):
    department: str = Field(..., min_length=2, max_length=100)
    current_job_title: str = Field(..., min_length=2, max_length=150)
    years_of_experience: float = Field(0.0, ge=0.0)
    bio: Optional[str] = None


class EmployeeCreate(EmployeeBase):
    user_id: str
    employee_code: str


class EmployeeUpdate(BaseModel):
    department: Optional[str] = None
    current_job_title: Optional[str] = None
    years_of_experience: Optional[float] = None
    bio: Optional[str] = None


class EmployeeRead(EmployeeBase):
    id: str
    user_id: str
    name: str
    email: str
    employee_code: str
    created_at: datetime
    updated_at: datetime
    total_skills_count: int = 0
    hidden_skills_count: int = 0

    model_config = {"from_attributes": True}


class EmployeeDetail(EmployeeRead):
    skills: List[EmployeeSkillRead] = []
    projects: List[ProjectRead] = []
