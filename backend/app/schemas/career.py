from typing import List, Optional
from pydantic import BaseModel, Field


class CareerChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)


class CareerChatResponse(BaseModel):
    response: str
    suggested_actions: List[str] = []


class LearningRecommendationRead(BaseModel):
    id: str
    employee_id: str
    skill_gap_id: Optional[str] = None
    title: str
    description: str
    resource_type: str
    priority: str

    model_config = {"from_attributes": True}
