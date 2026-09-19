from typing import List, Optional
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import get_current_user, require_hr
from app.core.permissions import verify_organization_access
from app.models.user import User
from app.schemas.role import InternalRoleCreate, InternalRoleRead, InternalRoleUpdate
from app.services.role_service import role_service

router = APIRouter(prefix="/roles", tags=["Internal Roles & Opportunities"])


@router.get("", response_model=List[InternalRoleRead])
def list_roles(
    status_filter: Optional[str] = "OPEN",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List open internal project and role opportunities in the organization."""
    return role_service.list_roles(
        db=db,
        organization_id=current_user.organization_id,
        status_filter=status_filter,
    )


@router.get("/{role_id}", response_model=InternalRoleRead)
def get_role_details(
    role_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Retrieve full role details, description, and required skill specifications."""
    role = role_service.get_role_by_id(db, role_id)
    verify_organization_access(current_user, role.organization_id)
    return role_service.format_role_read(role)


@router.post("", response_model=InternalRoleRead, status_code=status.HTTP_201_CREATED, dependencies=[require_hr])
def create_internal_role(
    role_in: InternalRoleCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a new internal opportunity with required skill proficiencies (HR only)."""
    return role_service.create_role(
        db=db,
        organization_id=current_user.organization_id,
        role_in=role_in,
        created_by_user_id=current_user.id,
    )


@router.patch("/{role_id}", response_model=InternalRoleRead, dependencies=[require_hr])
def update_internal_role(
    role_id: str,
    update_in: InternalRoleUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update internal role details or lifecycle status (HR only)."""
    role = role_service.get_role_by_id(db, role_id)
    verify_organization_access(current_user, role.organization_id)
    return role_service.update_role(db, role_id, update_in)

