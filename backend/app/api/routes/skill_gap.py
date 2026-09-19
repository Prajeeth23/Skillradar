from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import get_current_user
from app.core.permissions import verify_organization_access
from app.models.user import User, UserRole
from app.schemas.skill_gap import SkillGapRequest, SkillGapAnalysisResponse
from app.services.ai.skill_gap import skill_gap_service
from app.services.employee_service import employee_service
from app.services.role_service import role_service

router = APIRouter(prefix="/skill-gaps", tags=["Skill Gap Engine"])


@router.post("/analyze", response_model=SkillGapAnalysisResponse)
def analyze_skill_gaps(
    request: SkillGapRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Run skill-gap analysis for an employee against a target role, generating tailored learning recommendations."""
    target_emp_id = request.employee_id

    if current_user.role == UserRole.EMPLOYEE:
        if not current_user.employee:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Employee profile not found.")
        target_emp_id = current_user.employee.id
        emp = current_user.employee
    elif current_user.role in [UserRole.HR, UserRole.PLATFORM_ADMIN]:
        if not target_emp_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="employee_id must be provided when initiated by HR/Admin.",
            )
        emp = employee_service.get_employee_by_id(db, target_emp_id)
        verify_organization_access(current_user, emp.user.organization_id)
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")

    # Validate target role ownership
    target_role = role_service.get_role_by_id(db, request.target_role_id)
    verify_organization_access(current_user, target_role.organization_id)

    return skill_gap_service.analyze_gaps(
        db=db,
        employee_id=target_emp_id,
        target_role_id=request.target_role_id,
    )

