from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import get_current_employee
from app.models.employee import Employee
from app.models.learning_recommendation import LearningRecommendation
from app.schemas.career import CareerChatRequest, CareerChatResponse, LearningRecommendationRead
from app.services.ai.career_assistant import career_assistant_service

router = APIRouter(prefix="/career", tags=["AI Career Assistant"])


@router.post("/chat", response_model=CareerChatResponse)
def chat_with_career_assistant(
    request: CareerChatRequest,
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    """Interact with the personalized AI Career Assistant, grounded strictly in the authenticated employee's skills and projects."""
    return career_assistant_service.chat(
        db=db,
        employee=current_employee,
        message=request.message,
    )


@router.get("/recommendations", response_model=List[LearningRecommendationRead])
def get_my_learning_recommendations(
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    """List personalized learning and development recommendations generated from skill-gap analyses."""
    recs = (
        db.query(LearningRecommendation)
        .filter(LearningRecommendation.employee_id == current_employee.id)
        .all()
    )
    return [LearningRecommendationRead.model_validate(r) for r in recs]
