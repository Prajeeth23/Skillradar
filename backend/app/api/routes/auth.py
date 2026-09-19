import time
from collections import defaultdict
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, Token, AuthUserSummary
from app.services.auth_service import auth_service
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

# In-memory sliding window rate limiter for login protection
_login_attempts = defaultdict(list)
MAX_LOGIN_ATTEMPTS = 10
WINDOW_SECONDS = 60


def _enforce_login_rate_limit(request: Request, email: str):
    now = time.time()
    client_ip = request.client.host if request.client else "127.0.0.1"
    key = f"{client_ip}:{email.strip().lower()}"
    
    # Filter attempts within active time window
    attempts = [t for t in _login_attempts[key] if now - t < WINDOW_SECONDS]
    _login_attempts[key] = attempts
    
    if len(attempts) >= MAX_LOGIN_ATTEMPTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many authentication attempts. Please wait 60 seconds before trying again.",
        )
    _login_attempts[key].append(now)


@router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
def login(login_data: LoginRequest, request: Request, db: Session = Depends(get_db)):
    """Authenticate with email & password, returning a JWT token with rate-limiting protection."""
    _enforce_login_rate_limit(request, login_data.email)
    return auth_service.authenticate(db, login_data)


@router.get("/me", response_model=AuthUserSummary, status_code=status.HTTP_200_OK)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Retrieve details of the currently authenticated user."""
    emp_id = current_user.employee.id if current_user.employee else None
    return AuthUserSummary(
        id=current_user.id,
        name=current_user.name,
        email=current_user.email,
        role=current_user.role,
        organization_id=current_user.organization_id,
        employee_id=emp_id,
    )
