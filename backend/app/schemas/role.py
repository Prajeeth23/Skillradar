from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class RoleSkillCreate(BaseModel):
    skill_name: str
    category: str = "Technical"
    required_level: int = Field(3, ge=1, le=5)
    importance: str = "MANDATORY"  # MANDATORY, PREFERRED, BONUS


class RoleSkillRead(BaseModel):
    id: str
    skill_id: str
    skill_name: str
    category: str
    required_level: int
    importance: str

    model_config = {"from_attributes": True}


class InternalRoleBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=150)
    department: str = Field(..., min_length=2, max_length=100)
    description: str = Field(..., min_length=5)
    requirements: Optional[str] = None
    status: str = "OPEN"  # OPEN, DRAFT, FILLED, CLOSED


class InternalRoleCreate(InternalRoleBase):
    skills: List[RoleSkillCreate] = []


class InternalRoleUpdate(BaseModel):
    title: Optional[str] = None
    department: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    status: Optional[str] = None


class InternalRoleRead(InternalRoleBase):
    id: str
    organization_id: str
    created_by: Optional[str] = None
    created_at: datetime
    skills: List[RoleSkillRead] = []

    model_config = {"from_attributes": True}
