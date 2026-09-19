from typing import List, Optional
from pydantic import BaseModel, Field


class SkillGapRequest(BaseModel):
    target_role_id: str
    employee_id: Optional[str] = None  # Optional: HR can pass it, or defaults to current employee


class SkillGapItem(BaseModel):
    skill_name: str
    category: str
    current_level: int
    required_level: int
    gap_level: int
    priority: str  # HIGH, MEDIUM, LOW


class DevelopmentArea(BaseModel):
    title: str
    description: str
    resource_type: str  # COURSE, PROJECT, MENTORSHIP, CERTIFICATION
    priority: str


class SkillGapAnalysisResponse(BaseModel):
    employee_id: str
    employee_name: str
    target_role_id: str
    target_role_title: str
    readiness_score: float
    existing_skills: List[str]
    missing_skills: List[str]
    skill_gaps: List[SkillGapItem]
    recommended_development_areas: List[DevelopmentArea]
