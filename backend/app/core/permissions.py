from typing import List, Optional
from fastapi import HTTPException, status
from app.models.user import User, UserRole


class RoleChecker:
    """Dependency for RBAC role authorization."""

    def __init__(self, allowed_roles: List[UserRole]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user: User) -> User:
        if current_user.role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted for role '{current_user.role.value}'. Required one of: {[r.value for r in self.allowed_roles]}",
            )
        return current_user


def verify_organization_access(current_user: User, organization_id: Optional[str]) -> None:
    """Ensure user belongs to the target organization (unless PLATFORM_ADMIN)."""
    if current_user.role == UserRole.PLATFORM_ADMIN:
        return
    if not organization_id or current_user.organization_id != organization_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cross-organization data access is strictly forbidden.",
        )


def verify_employee_self_or_hr(current_user: User, target_employee_user_id: str) -> None:
    """Ensure an employee can only view/modify their own dossier, or HR within same org."""
    if current_user.role == UserRole.PLATFORM_ADMIN:
        return
    if current_user.role == UserRole.HR:
        return
    if current_user.role == UserRole.EMPLOYEE and current_user.id != target_employee_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Employees can only view or manage their own private dossier.",
        )
