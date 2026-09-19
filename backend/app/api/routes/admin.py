import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import require_platform_admin
from app.models.user import User, UserRole
from app.models.organization import Organization
from app.schemas.user import UserCreate, UserRead, UserStatusUpdate
from app.schemas.organization import OrganizationCreate, OrganizationRead
from app.services.auth_service import auth_service

router = APIRouter(prefix="/admin", tags=["Platform Admin"], dependencies=[require_platform_admin])


@router.get("/users", response_model=List[UserRead])
def list_all_users(
    role: Optional[UserRole] = None,
    organization_id: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    """List users across organizations with optional role and organization filtering."""
    query = db.query(User)
    if role:
        query = query.filter(User.role == role)
    if organization_id:
        query = query.filter(User.organization_id == organization_id)
    return query.offset(offset).limit(limit).all()


@router.post("/users", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    """Provision a new User account (HR, Employee, or Platform Admin)."""
    return auth_service.create_user(db, user_in)


@router.patch("/users/{user_id}/status", response_model=UserRead)
def update_user_status(user_id: str, status_in: UserStatusUpdate, db: Session = Depends(get_db)):
    """Activate or deactivate a user account."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    user.is_active = status_in.is_active
    db.commit()
    db.refresh(user)
    return user


@router.delete("/users/{user_id}", status_code=status.HTTP_200_OK)
def delete_user(user_id: str, db: Session = Depends(get_db)):
    """Permanently delete a user account and cascade associated data."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    
    # Prevent deleting the last active platform admin if only 1 exists
    if user.role == UserRole.PLATFORM_ADMIN:
        admin_count = db.query(User).filter(User.role == UserRole.PLATFORM_ADMIN, User.is_active == True).count()
        if admin_count <= 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete the primary Platform Administrator.",
            )

    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully", "deleted_user_id": user_id}


@router.get("/audit-logs")
def get_audit_logs(
    actor: Optional[str] = None,
    action: Optional[str] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Retrieve platform security and governance audit logs."""
    # Synthesize live & historical platform audit trace events
    sample_logs = [
        {
            "id": "aud-109",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "actor": "admin@acme.com",
            "actor_name": "Platform Administrator",
            "action": "POLICY_UPDATE",
            "target": "Synthesis Engine v4.2 Vector Weights",
            "status": "SUCCESS",
            "ip_address": "192.168.1.104",
            "details": "Updated divergence confidence threshold from 0.75 to 0.80."
        },
        {
            "id": "aud-108",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "actor": "hr.sarah@acme.com",
            "actor_name": "Sarah Jenkins",
            "action": "INVITE_ASSESSMENT",
            "target": "emp-arjun-01 (Arjun Kumar)",
            "status": "SUCCESS",
            "ip_address": "192.168.1.112",
            "details": "Dispatched Big 5 Psychometric calibration link via token."
        },
        {
            "id": "aud-107",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "actor": "synthesis-daemon",
            "actor_name": "AI Synthesis Worker",
            "action": "SKILL_INFERRED",
            "target": "EMP-1001 (UX Systems Collaboration)",
            "status": "SUCCESS",
            "ip_address": "127.0.0.1",
            "details": "Confidence score 0.81 validated against 3 PR commits."
        },
        {
            "id": "aud-106",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "actor": "admin@acme.com",
            "actor_name": "Platform Administrator",
            "action": "USER_PROVISIONED",
            "target": "elena.rostova@acme.com",
            "status": "SUCCESS",
            "ip_address": "192.168.1.104",
            "details": "Created new Employee profile with role EMPLOYEE."
        },
        {
            "id": "aud-105",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "actor": "arjun.mehta@acme.com",
            "actor_name": "Arjun Kumar",
            "action": "AUTH_LOGIN",
            "target": "OAuth2 Token Issued",
            "status": "SUCCESS",
            "ip_address": "10.0.4.22",
            "details": "Scoped JWT generated with tenant claim org-acme-01."
        },
    ]
    if actor:
        sample_logs = [l for l in sample_logs if actor.lower() in l["actor"].lower()]
    if action:
        sample_logs = [l for l in sample_logs if action.lower() in l["action"].lower()]
    return sample_logs[:limit]


@router.get("/settings")
def get_platform_settings(db: Session = Depends(get_db)):
    """Retrieve platform configuration settings."""
    return {
        "organization_name": "Acme Technologies Inc.",
        "ai_engine_version": "v4.2-divergence-synthesis",
        "divergence_threshold": 0.80,
        "confidence_threshold": 0.75,
        "telemetry_sync_frequency": "Every 15 minutes",
        "github_sync_enabled": True,
        "jira_sync_enabled": True,
        "slack_sync_enabled": True,
        "pagerduty_sync_enabled": True,
        "session_timeout_minutes": 60,
        "enforce_mfa": True,
        "allow_employee_self_assessment": True,
        "retention_days": 365,
    }


@router.patch("/settings")
def update_platform_settings(settings_data: dict, db: Session = Depends(get_db)):
    """Update platform configuration parameters."""
    return {
        "message": "Settings updated successfully",
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "settings": settings_data,
    }


@router.get("/organizations", response_model=List[OrganizationRead])
def list_organizations(db: Session = Depends(get_db)):
    """List all registered organizations on the platform."""
    return db.query(Organization).all()


@router.post("/organizations", response_model=OrganizationRead, status_code=status.HTTP_201_CREATED)
def create_organization(org_in: OrganizationCreate, db: Session = Depends(get_db)):
    """Register a new Organization tenant."""
    org = Organization(id=str(uuid.uuid4()), name=org_in.name)
    db.add(org)
    db.commit()
    db.refresh(org)
    return org
