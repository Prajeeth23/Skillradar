import uuid
from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.user import User, UserRole
from app.models.employee import Employee
from app.models.organization import Organization
from app.schemas.auth import Token, AuthUserSummary, LoginRequest
from app.schemas.user import UserCreate


class AuthService:
    @staticmethod
    def authenticate(db: Session, login_data: LoginRequest) -> Token:
        user = db.query(User).filter(User.email == login_data.email).first()
        if not user or not verify_password(login_data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive. Please contact your platform administrator.",
            )

        token = create_access_token(
            subject=user.id,
            role=user.role.value,
            organization_id=user.organization_id,
        )

        emp_id = user.employee.id if user.employee else None

        user_summary = AuthUserSummary(
            id=user.id,
            name=user.name,
            email=user.email,
            role=user.role,
            organization_id=user.organization_id,
            employee_id=emp_id,
        )

        return Token(
            access_token=token,
            token_type="bearer",
            expires_in=86400,
            user=user_summary,
        )

    @staticmethod
    def create_user(db: Session, user_in: UserCreate) -> User:
        existing = db.query(User).filter(User.email == user_in.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with email '{user_in.email}' already exists.",
            )

        if user_in.organization_id:
            org = db.query(Organization).filter(Organization.id == user_in.organization_id).first()
            if not org:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Organization with id '{user_in.organization_id}' not found.",
                )

        user = User(
            id=str(uuid.uuid4()),
            name=user_in.name,
            email=user_in.email,
            password_hash=get_password_hash(user_in.password),
            role=user_in.role,
            organization_id=user_in.organization_id,
            is_active=True,
        )
        db.add(user)
        db.flush()

        # If role is EMPLOYEE, provision Employee record
        if user_in.role == UserRole.EMPLOYEE:
            emp_code = user_in.employee_code or f"EMP-{uuid.uuid4().hex[:6].upper()}"
            dept = user_in.department or "General"
            title = user_in.current_job_title or "Associate"
            employee = Employee(
                id=str(uuid.uuid4()),
                user_id=user.id,
                employee_code=emp_code,
                department=dept,
                current_job_title=title,
                years_of_experience=user_in.years_of_experience or 1.0,
                bio=user_in.bio,
            )
            db.add(employee)

        db.commit()
        db.refresh(user)
        return user


auth_service = AuthService()
