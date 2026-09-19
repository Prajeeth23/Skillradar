from typing import List
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import get_current_user, get_current_employee, require_hr
from app.models.user import User
from app.models.employee import Employee
from app.models.role import InternalRole
from app.models.role_match import RoleMatch
from app.schemas.matching import (
    RoleMatchRequest,
    RoleMatchesResponse,
    EmployeeRoleMatchCard,
)
from app.services.ai.role_matching import role_matching_engine
from app.services.role_service import role_service

router = APIRouter(prefix="/matching", tags=["AI Role Matching"])


@router.post("/roles/{role_id}", response_model=RoleMatchesResponse, dependencies=[require_hr])
def run_role_matching(
    role_id: str,
    body: RoleMatchRequest = RoleMatchRequest(),
    db: Session = Depends(get_db),
):
    """Run AI Candidate Matching for a role across organization employees, computing explainability and evidence."""
    return role_matching_engine.match_role_candidates(
        db=db,
        role_id=role_id,
        min_score=body.min_score,
        limit=body.limit,
    )


@router.get("/roles/{role_id}/matches", response_model=RoleMatchesResponse, dependencies=[require_hr])
def get_existing_role_matches(
    role_id: str,
    min_score: float = Query(0.0, ge=0.0, le=100.0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """Retrieve pre-evaluated candidate matches and AI explanations for an internal role."""
    role = role_service.get_role_by_id(db, role_id)
    matches = (
        db.query(RoleMatch)
        .filter(RoleMatch.role_id == role_id, RoleMatch.match_score >= min_score)
        .order_by(RoleMatch.match_score.desc())
        .limit(limit)
        .all()
    )

    top_matches = [
        role_matching_engine.evaluate_candidate(db, m.employee, role)
        for m in matches
    ]

    return RoleMatchesResponse(
        role_id=role.id,
        role_title=role.title,
        total_candidates_evaluated=len(top_matches),
        top_matches=top_matches,
    )


@router.get("/me/recommendations", response_model=List[EmployeeRoleMatchCard])
def get_my_role_recommendations(
    min_score: float = Query(40.0, ge=0.0, le=100.0),
    limit: int = Query(10, ge=1, le=50),
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    """Retrieve top matching internal roles for the authenticated employee with AI explanations."""
    open_roles = (
        db.query(InternalRole)
        .filter(
            InternalRole.organization_id == current_employee.user.organization_id,
            InternalRole.status == "OPEN",
        )
        .all()
    )

    results: List[EmployeeRoleMatchCard] = []
    for role in open_roles:
        match_result = role_matching_engine.evaluate_candidate(db, current_employee, role)
        if match_result.match_score >= min_score:
            results.append(
                EmployeeRoleMatchCard(
                    role_id=role.id,
                    role_title=role.title,
                    department=role.department,
                    match_score=match_result.match_score,
                    matching_skills=match_result.matching_skills,
                    missing_skills=match_result.missing_skills,
                    transferable_skills=match_result.transferable_skills,
                    explanation=match_result.explanation,
                    generated_at=match_result.generated_at,
                )
            )

    results.sort(key=lambda x: x.match_score, reverse=True)
    return results[:limit]
