from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.dependencies import get_current_employee
from app.models.employee import Employee
from app.models.project import Project
from app.schemas.employee import EmployeeDetail, EmployeeUpdate, EmployeeRead
from app.schemas.project import ProjectCreate, ProjectRead, ProjectUpdate
from app.services.employee_service import employee_service

router = APIRouter(prefix="/employees", tags=["Employee Self-Service"])


@router.get("/me", response_model=EmployeeDetail)
def get_my_profile(
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    """Retrieve the authenticated employee's personal talent profile, skills, and projects."""
    return employee_service.get_employee_detail(db, current_employee.id)


@router.put("/me", response_model=EmployeeRead)
def update_my_profile(
    update_in: EmployeeUpdate,
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    """Update personal biography or profile details."""
    updated = employee_service.update_employee(db, current_employee.id, update_in)
    return EmployeeRead.model_validate(updated)


@router.get("/me/projects", response_model=List[ProjectRead])
def list_my_projects(current_employee: Employee = Depends(get_current_employee)):
    """List all projects and work activity records for the authenticated employee."""
    return [ProjectRead.model_validate(p) for p in current_employee.projects]


@router.post("/me/projects", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
def add_my_project(
    project_in: ProjectCreate,
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    """Add a new project, achievement, or work task to the employee's history."""
    project = employee_service.add_project(db, current_employee.id, project_in)
    return ProjectRead.model_validate(project)


@router.put("/me/projects/{project_id}", response_model=ProjectRead)
def update_my_project(
    project_id: str,
    project_in: ProjectUpdate,
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    """Update details of an existing project record."""
    # Ensure project belongs to current employee
    proj = (
        db.query(Project)
        .filter(Project.id == project_id, Project.employee_id == current_employee.id)
        .first()
    )
    if not proj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    updated = employee_service.update_project(db, project_id, project_in)
    return ProjectRead.model_validate(updated)


@router.delete("/me/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_my_project(
    project_id: str,
    current_employee: Employee = Depends(get_current_employee),
    db: Session = Depends(get_db),
):
    """Delete a project record."""
    proj = (
        db.query(Project)
        .filter(Project.id == project_id, Project.employee_id == current_employee.id)
        .first()
    )
    if not proj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    employee_service.delete_project(db, project_id)
