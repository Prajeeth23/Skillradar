from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import get_current_user
from app.core.permissions import verify_employee_self_or_hr
from app.models.user import User, UserRole
from app.models.employee import Employee
from app.models.skill import Skill
from app.schemas.skill import SkillRead, DivergenceAnalysisResponse
from app.services.employee_service import employee_service
from app.services.ai.divergence_engine import divergence_engine

router = APIRouter(prefix="/skills", tags=["Skills & Divergence Engine"])


@router.post("/divergence/analyze/{employee_id}", response_model=DivergenceAnalysisResponse)
def run_divergence_analysis(
    employee_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Trigger the Divergence Engine: Contrasts the employee's official job title with
    actual project work to discover hidden and transferable skills backed by evidence."""
    employee = employee_service.get_employee_by_id(db, employee_id)
    verify_employee_self_or_hr(current_user, employee.user_id)

    return divergence_engine.analyze_employee(db, employee)


@router.get("", response_model=List[SkillRead])
def list_canonical_skills(db: Session = Depends(get_db)):
    """List all registered canonical skills in the platform taxonomy."""
    return db.query(Skill).order_by(Skill.category, Skill.name).all()
