from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict, Field
from app.models.psychometric_assessment import AssessmentStatus, TraitType


class TraitScoreOut(BaseModel):
    trait: TraitType
    score: float

    model_config = ConfigDict(from_attributes=True)


class PsychometricAssessmentOut(BaseModel):
    id: str
    employee_id: str
    status: AssessmentStatus
    assessment_token: str
    sent_at: datetime
    completed_at: Optional[datetime] = None
    trait_summary: Optional[str] = None
    trait_scores: List[TraitScoreOut] = []

    model_config = ConfigDict(from_attributes=True)


class AssessmentQuestionOption(BaseModel):
    id: str
    text: str
    subtext: Optional[str] = None
    tag: Optional[str] = None


class AssessmentQuestionOut(BaseModel):
    id: int
    title: Optional[str] = None
    domain: Optional[str] = None
    xp_reward: int = 100
    question: str
    options: List[AssessmentQuestionOption]


class AssessmentQuestionsResponse(BaseModel):
    assessment_id: str
    employee_name: str
    status: AssessmentStatus
    questions: List[AssessmentQuestionOut]
    completed_assessment: Optional[PsychometricAssessmentOut] = None


class AssessmentSubmission(BaseModel):
    answers: List[str] = Field(
        ...,
        min_length=1,
        description="List of selected option IDs or serialized answers corresponding to each question",
    )
    trait_scores: Optional[Dict[str, float]] = None
    trait_summary: Optional[str] = None


class AssessmentShareLinkResponse(BaseModel):
    assessment_id: str
    assessment_token: str
    share_url: str
    employee_name: str
    status: AssessmentStatus
    sent_at: datetime


class EmployeePsychometricsResponse(BaseModel):
    employee_id: str
    employee_name: str
    has_assessment: bool
    status: AssessmentStatus
    assessment: Optional[PsychometricAssessmentOut] = None
    radar_data: List[Dict[str, Any]] = []
