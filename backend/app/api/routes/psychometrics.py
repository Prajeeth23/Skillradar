import secrets
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.core.permissions import RoleChecker, verify_employee_self_or_hr, verify_organization_access
from app.models.user import User, UserRole
from app.models.employee import Employee
from app.models.psychometric_assessment import (
    PsychometricAssessment,
    PsychometricTraitScore,
    AssessmentStatus,
    TraitType,
)
from app.schemas.psychometric import (
    PsychometricAssessmentOut,
    TraitScoreOut,
    AssessmentQuestionsResponse,
    AssessmentSubmission,
    AssessmentShareLinkResponse,
    EmployeePsychometricsResponse,
)
from app.services.ai.psychometric_engine import psychometric_engine
from app.services.notification_service import notification_service

router = APIRouter(prefix="/psychometrics", tags=["Psychometric Assessments"])

# RBAC checkers
require_hr_or_admin = RoleChecker([UserRole.HR, UserRole.PLATFORM_ADMIN])


@router.post("/{employee_id}/send-link", response_model=AssessmentShareLinkResponse)
def send_assessment_link(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """[HR / Admin Only] Generate a shareable psychometric assessment link for an employee."""
    require_hr_or_admin(current_user)

    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found.",
        )
    verify_organization_access(current_user, employee.user.organization_id)


    # Check for existing pending assessment or create a fresh one
    assessment = (
        db.query(PsychometricAssessment)
        .filter(
            PsychometricAssessment.employee_id == employee.id,
            PsychometricAssessment.status == AssessmentStatus.PENDING,
        )
        .first()
    )

    if not assessment:
        token = secrets.token_urlsafe(24)
        assessment = PsychometricAssessment(
            employee_id=employee.id,
            status=AssessmentStatus.PENDING,
            assessment_token=token,
            sent_at=datetime.now(timezone.utc),
        )
        db.add(assessment)
        db.commit()
        db.refresh(assessment)
    else:
        token = assessment.assessment_token

    # Dispatch in-app notification to employee
    notification_service.notify_employee_assessment_sent(
        db=db,
        employee=employee,
        assessment_token=token,
    )

    share_url = f"/assessment/{token}"

    return AssessmentShareLinkResponse(
        assessment_id=assessment.id,
        assessment_token=token,
        share_url=share_url,
        employee_name=employee.user.name,
        status=assessment.status,
        sent_at=assessment.sent_at,
    )


@router.get("/assessment/{token}", response_model=AssessmentQuestionsResponse)
def get_assessment_by_token(
    token: str,
    db: Session = Depends(get_db),
):
    """Public token-based access to the assessment questions."""
    assessment = (
        db.query(PsychometricAssessment)
        .filter(PsychometricAssessment.assessment_token == token)
        .first()
    )
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment link is invalid or has expired.",
        )

    questions = psychometric_engine.get_public_questions()

    return AssessmentQuestionsResponse(
        assessment_id=assessment.id,
        employee_name=assessment.employee.user.name,
        status=assessment.status,
        questions=questions,
    )


@router.post("/assessment/{token}/submit", response_model=PsychometricAssessmentOut)
def submit_assessment(
    token: str,
    submission: AssessmentSubmission,
    db: Session = Depends(get_db),
):
    """Submit answers for an assessment, calculate trait scores, and generate an AI summary."""
    assessment = (
        db.query(PsychometricAssessment)
        .filter(PsychometricAssessment.assessment_token == token)
        .first()
    )
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found.",
        )

    # Score answers: use custom computed scores if provided, else calculate via engine
    if submission.trait_scores:
        scores: Dict[str, float] = {}
        for trait_enum in TraitType:
            trait_key = trait_enum.value
            if trait_key in submission.trait_scores:
                scores[trait_key] = float(submission.trait_scores[trait_key])
            elif trait_key.lower() in submission.trait_scores:
                scores[trait_key] = float(submission.trait_scores[trait_key.lower()])
            else:
                scores[trait_key] = 70.0
    else:
        scores = psychometric_engine.score_assessment(submission.answers)

    # Clear prior scores if any
    db.query(PsychometricTraitScore).filter(
        PsychometricTraitScore.assessment_id == assessment.id
    ).delete()

    trait_score_objects = []
    for trait_key, score_val in scores.items():
        ts = PsychometricTraitScore(
            assessment_id=assessment.id,
            trait=TraitType(trait_key),
            score=score_val,
        )
        db.add(ts)
        trait_score_objects.append(ts)

    # Generate executive summary or use submitted one
    if submission.trait_summary and len(submission.trait_summary.strip()) > 10:
        summary = submission.trait_summary.strip()
    else:
        summary = psychometric_engine.generate_trait_summary(scores)

    # Update assessment record
    assessment.status = AssessmentStatus.COMPLETED
    assessment.completed_at = datetime.now(timezone.utc)
    assessment.trait_summary = summary

    db.commit()
    db.refresh(assessment)

    # Notify HR that results are ready
    notification_service.notify_hr_assessment_completed(db=db, employee=assessment.employee)

    return PsychometricAssessmentOut(
        id=assessment.id,
        employee_id=assessment.employee_id,
        status=assessment.status,
        assessment_token=assessment.assessment_token,
        sent_at=assessment.sent_at,
        completed_at=assessment.completed_at,
        trait_summary=assessment.trait_summary,
        trait_scores=[
            TraitScoreOut(trait=ts.trait, score=ts.score)
            for ts in assessment.trait_scores
        ],
    )


@router.get("/{employee_id}", response_model=EmployeePsychometricsResponse)
def get_employee_psychometrics(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get trait scores, radar data, and summary for an employee [HR can view all; Employee can only view own]."""
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found.",
        )

    # Ownership check: Employee can view own; HR/Admin within same organization can view
    verify_employee_self_or_hr(current_user, employee.user_id, employee.user.organization_id)


    # Find latest completed assessment, or pending
    assessment = (
        db.query(PsychometricAssessment)
        .filter(PsychometricAssessment.employee_id == employee.id)
        .order_by(
            PsychometricAssessment.status == AssessmentStatus.COMPLETED,
            PsychometricAssessment.completed_at.desc().nullslast(),
            PsychometricAssessment.sent_at.desc(),
        )
        .first()
    )

    if not assessment:
        return EmployeePsychometricsResponse(
            employee_id=employee.id,
            employee_name=employee.user.name,
            has_assessment=False,
            status=AssessmentStatus.PENDING,
            assessment=None,
            radar_data=[],
        )

    scores_dict: Dict[str, float] = {
        ts.trait.value: ts.score for ts in assessment.trait_scores
    }

    radar_data = [
        {"trait": "Leadership", "score": scores_dict.get(TraitType.LEADERSHIP.value, 0.0), "fullMark": 100},
        {"trait": "Adaptability", "score": scores_dict.get(TraitType.ADAPTABILITY.value, 0.0), "fullMark": 100},
        {"trait": "Analytical Thinking", "score": scores_dict.get(TraitType.ANALYTICAL_THINKING.value, 0.0), "fullMark": 100},
        {"trait": "Collaboration", "score": scores_dict.get(TraitType.COLLABORATION.value, 0.0), "fullMark": 100},
    ]

    assessment_out = PsychometricAssessmentOut(
        id=assessment.id,
        employee_id=assessment.employee_id,
        status=assessment.status,
        assessment_token=assessment.assessment_token,
        sent_at=assessment.sent_at,
        completed_at=assessment.completed_at,
        trait_summary=assessment.trait_summary,
        trait_scores=[
            TraitScoreOut(trait=ts.trait, score=ts.score)
            for ts in assessment.trait_scores
        ],
    )

    return EmployeePsychometricsResponse(
        employee_id=employee.id,
        employee_name=employee.user.name,
        has_assessment=(assessment.status == AssessmentStatus.COMPLETED),
        status=assessment.status,
        assessment=assessment_out,
        radar_data=radar_data,
    )
