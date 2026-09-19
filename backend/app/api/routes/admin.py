import uuid
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
