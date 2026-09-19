from fastapi import APIRouter
from app.api.routes import (
    auth,
    admin,
    hr,
    employees,
    skills,
    roles,
    matching,
    skill_gap,
    career,
    notifications,
    psychometrics,
)

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(admin.router)
api_router.include_router(hr.router)
api_router.include_router(employees.router)
api_router.include_router(skills.router)
api_router.include_router(roles.router)
api_router.include_router(matching.router)
api_router.include_router(skill_gap.router)
api_router.include_router(career.router)
api_router.include_router(notifications.router)
api_router.include_router(psychometrics.router)
