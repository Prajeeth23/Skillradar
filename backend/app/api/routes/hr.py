from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.session import get_db
from app.core.dependencies import get_current_user, require_hr
from app.core.permissions import verify_organization_access
from app.models.user import User
from app.models.employee import Employee
from app.models.skill import Skill
from app.models.employee_skill import EmployeeSkill
from app.schemas.employee import EmployeeRead, EmployeeDetail
from app.schemas.project import ProjectCreate, ProjectRead
from app.services.employee_service import employee_service

router = APIRouter(prefix="/hr", tags=["HR Talent Intelligence"], dependencies=[require_hr])


@router.get("/employees", response_model=List[EmployeeRead])
def list_employees(
    department: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List employees within the HR user's organization with explicit & hidden skill metrics."""
    return employee_service.list_organization_employees(
        db=db,
        organization_id=current_user.organization_id,
        department=department,
        limit=limit,
        offset=offset,
    )


@router.get("/employees/{employee_id}", response_model=EmployeeDetail)
def get_employee_dossier(
    employee_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """View complete employee dossier including work history, verified skills, and hidden abilities."""
    emp = employee_service.get_employee_by_id(db, employee_id)
    verify_organization_access(current_user, emp.user.organization_id)
    return employee_service.get_employee_detail(db, employee_id)


@router.post("/employees/{employee_id}/projects", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
def add_employee_project(
    employee_id: str,
    project_in: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Record verified project or work activity data for an employee."""
    emp = employee_service.get_employee_by_id(db, employee_id)
    verify_organization_access(current_user, emp.user.organization_id)
    project = employee_service.add_project(db, employee_id, project_in)
    return ProjectRead.model_validate(project)


@router.get("/analytics/skills", response_model=Dict[str, Any])
def get_organization_skills_analytics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Aggregated organization-wide talent intelligence: total skills, hidden talents, top categories."""
    org_id = current_user.organization_id

    # Total employees in org
    total_employees = (
        db.query(func.count(Employee.id))
        .join(User, Employee.user_id == User.id)
        .filter(User.organization_id == org_id)
        .scalar()
        or 0
    )

    # Discovered hidden skills count
    hidden_skills_count = (
        db.query(func.count(EmployeeSkill.id))
        .join(Employee, EmployeeSkill.employee_id == Employee.id)
        .join(User, Employee.user_id == User.id)
        .filter(User.organization_id == org_id, EmployeeSkill.is_hidden == True)
        .scalar()
        or 0
    )

    # Top discovered hidden skills
    top_hidden = (
        db.query(Skill.name, func.count(EmployeeSkill.id).label("count"))
        .join(EmployeeSkill, Skill.id == EmployeeSkill.skill_id)
        .join(Employee, EmployeeSkill.employee_id == Employee.id)
        .join(User, Employee.user_id == User.id)
        .filter(User.organization_id == org_id, EmployeeSkill.is_hidden == True)
        .group_by(Skill.name)
        .order_by(func.count(EmployeeSkill.id).desc())
        .limit(5)
        .all()
    )

    return {
        "organization_id": org_id,
        "total_employees": total_employees,
        "total_hidden_skills_discovered": hidden_skills_count,
        "top_hidden_capabilities": [{"skill": h[0], "practitioners": h[1]} for h in top_hidden],
    }
