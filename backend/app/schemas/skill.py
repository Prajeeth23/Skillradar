from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class SkillBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    category: str = Field("Technical", max_length=100)
    description: Optional[str] = None


class SkillCreate(SkillBase):
    pass


class SkillRead(SkillBase):
    id: str

    model_config = {"from_attributes": True}


class EmployeeSkillCreate(BaseModel):
    skill_name: str
    category: str = "Technical"
    proficiency: int = Field(3, ge=1, le=5)
    confidence: float = Field(1.0, ge=0.0, le=1.0)
    source: str = "project"  # resume, project, certification, AI_inferred, HR_added
    evidence: Optional[str] = None
    is_hidden: bool = False


class EmployeeSkillRead(BaseModel):
    id: str
    skill_id: str
    skill_name: str
    category: str
    proficiency: int
    confidence: float
    source: str
    evidence: Optional[str] = None
    is_hidden: bool
    last_updated: datetime

    model_config = {"from_attributes": True}


# Structured output model for Divergence Engine discovery
class DiscoveredSkill(BaseModel):
    name: str
    category: str = "Technical"
    proficiency: int = 3
    confidence: float = 0.85
    type: str = "hidden"  # explicit, hidden, transferable
    evidence: str


class DivergenceAnalysisResponse(BaseModel):
    employee_id: str
    employee_name: str
    current_job_title: str
    analyzed_projects_count: int
    explicit_skills: List[DiscoveredSkill]
    hidden_skills: List[DiscoveredSkill]
    transferable_skills: List[DiscoveredSkill]
    divergence_summary: str
