from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class RoleMatchRequest(BaseModel):
    min_score: float = Field(40.0, ge=0.0, le=100.0)
    limit: int = Field(10, ge=1, le=50)


class CandidateMatchResult(BaseModel):
    employee_id: str
    employee_name: str
    current_job_title: str
    department: str
    match_score: float
    matching_skills: List[str]
    missing_skills: List[str]
    transferable_skills: List[str]
    explanation: str
    evidence: List[str] = []
    generated_at: datetime


class RoleMatchesResponse(BaseModel):
    role_id: str
    role_title: str
    total_candidates_evaluated: int
    top_matches: List[CandidateMatchResult]


class EmployeeRoleMatchCard(BaseModel):
    role_id: str
    role_title: str
    department: str
    match_score: float
    matching_skills: List[str]
    missing_skills: List[str]
    transferable_skills: List[str]
    explanation: str
    generated_at: datetime
