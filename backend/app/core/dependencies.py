from typing import List, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import decode_access_token
from app.db.session import get_db
from app.models.user import User, UserRole
from app.models.employee import Employee

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_PREFIX}/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Validate bearer token and retrieve current active user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials or token expired.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception

    user_id: Optional[str] = payload.get("sub")
    if user_id is None:
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated.",
        )

    # Multi-tenant claim verification: Ensure token org_id matches the user's active database organization
    token_org_id = payload.get("org_id")
    if token_org_id and user.role != UserRole.PLATFORM_ADMIN:
        if str(user.organization_id) != str(token_org_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Organization mismatch between token claim and user record.",
            )

    return user



def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    return current_user


def get_current_employee(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Employee:
    """Retrieve the Employee record associated with the authenticated user."""
    if current_user.role != UserRole.EMPLOYEE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current user is not registered as an Employee profile.",
        )
    employee = db.query(Employee).filter(Employee.user_id == current_user.id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee profile not found for the current user.",
        )
    return employee


class RoleChecker:
    """Dependency for RBAC role authorization."""

    def __init__(self, allowed_roles: List[UserRole]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted for role '{current_user.role.value}'. Required one of: {[r.value for r in self.allowed_roles]}",
            )
        return current_user


# Role Gate Dependencies for routes & routers
require_platform_admin = Depends(RoleChecker([UserRole.PLATFORM_ADMIN]))
require_hr = Depends(RoleChecker([UserRole.HR, UserRole.PLATFORM_ADMIN]))
require_employee_only = Depends(RoleChecker([UserRole.EMPLOYEE]))
require_any_authenticated = Depends(get_current_user)
