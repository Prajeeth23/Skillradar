from typing import Optional
from pydantic import BaseModel, EmailStr
from app.models.user import UserRole


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: "AuthUserSummary"


class AuthUserSummary(BaseModel):
    id: str
    name: str
    email: str
    role: UserRole
    organization_id: Optional[str] = None
    employee_id: Optional[str] = None

    model_config = {"from_attributes": True}


class TokenPayload(BaseModel):
    sub: str
    role: str
    org_id: Optional[str] = None
    exp: int


Token.model_rebuild()
