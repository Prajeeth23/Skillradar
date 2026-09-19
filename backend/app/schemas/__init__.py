"""Pydantic Schemas Package."""
from app.schemas.common import StandardResponse, ErrorResponse, PaginatedResponse
from app.schemas.auth import LoginRequest, Token, AuthUserSummary, TokenPayload
from app.schemas.organization import OrganizationCreate, OrganizationRead
from app.schemas.user import UserCreate, UserRead, UserUpdate, UserStatusUpdate
from app.schemas.employee import EmployeeCreate, EmployeeRead, EmployeeUpdate, EmployeeDetail
from app.schemas.project import ProjectCreate, ProjectRead, ProjectUpdate
from app.schemas.skill import (
    SkillCreate,
    SkillRead,
    EmployeeSkillCreate,
    EmployeeSkillRead,
    DiscoveredSkill,
    DivergenceAnalysisResponse,
)
from app.schemas.role import (
    RoleSkillCreate,
    RoleSkillRead,
    InternalRoleCreate,
    InternalRoleRead,
    InternalRoleUpdate,
)
from app.schemas.matching import (
    RoleMatchRequest,
    CandidateMatchResult,
    RoleMatchesResponse,
    EmployeeRoleMatchCard,
)
from app.schemas.skill_gap import (
    SkillGapRequest,
    SkillGapItem,
    DevelopmentArea,
    SkillGapAnalysisResponse,
)
from app.schemas.career import CareerChatRequest, CareerChatResponse, LearningRecommendationRead
from app.schemas.notification import NotificationRead, NotificationStatusUpdate, NotificationSummary

__all__ = [
    "StandardResponse",
    "ErrorResponse",
    "PaginatedResponse",
    "LoginRequest",
    "Token",
    "AuthUserSummary",
    "TokenPayload",
    "OrganizationCreate",
    "OrganizationRead",
    "UserCreate",
    "UserRead",
    "UserUpdate",
    "UserStatusUpdate",
    "EmployeeCreate",
    "EmployeeRead",
    "EmployeeUpdate",
    "EmployeeDetail",
    "ProjectCreate",
    "ProjectRead",
    "ProjectUpdate",
    "SkillCreate",
    "SkillRead",
    "EmployeeSkillCreate",
    "EmployeeSkillRead",
    "DiscoveredSkill",
    "DivergenceAnalysisResponse",
    "RoleSkillCreate",
    "RoleSkillRead",
    "InternalRoleCreate",
    "InternalRoleRead",
    "InternalRoleUpdate",
    "RoleMatchRequest",
    "CandidateMatchResult",
    "RoleMatchesResponse",
    "EmployeeRoleMatchCard",
    "SkillGapRequest",
    "SkillGapItem",
    "DevelopmentArea",
    "SkillGapAnalysisResponse",
    "CareerChatRequest",
    "CareerChatResponse",
    "LearningRecommendationRead",
    "NotificationRead",
    "NotificationStatusUpdate",
    "NotificationSummary",
]
