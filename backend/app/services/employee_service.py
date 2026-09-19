import uuid
from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.employee import Employee
from app.models.user import User
from app.models.project import Project
from app.models.skill import Skill
from app.models.employee_skill import EmployeeSkill
from app.schemas.employee import EmployeeUpdate, EmployeeDetail, EmployeeRead
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectRead
from app.schemas.skill import EmployeeSkillRead


class EmployeeService:
    @staticmethod
    def get_employee_by_id(db: Session, employee_id: str) -> Employee:
        emp = db.query(Employee).filter(Employee.id == employee_id).first()
        if not emp:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Employee with id '{employee_id}' not found.",
            )
        return emp

    @staticmethod
    def get_employee_by_user_id(db: Session, user_id: str) -> Employee:
        emp = db.query(Employee).filter(Employee.user_id == user_id).first()
        if not emp:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee profile not found for this user.",
            )
        return emp

    @staticmethod
    def list_organization_employees(
        db: Session,
        organization_id: Optional[str] = None,
        department: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> List[EmployeeRead]:
        query = db.query(Employee).join(User, Employee.user_id == User.id)
        if organization_id:
            query = query.filter(User.organization_id == organization_id)
        if department:
            query = query.filter(Employee.department == department)

        employees = query.offset(offset).limit(limit).all()

        results = []
        for emp in employees:
            total_skills = len(emp.skills)
            hidden_skills = sum(1 for s in emp.skills if s.is_hidden)
            results.append(
                EmployeeRead(
                    id=emp.id,
                    user_id=emp.user_id,
                    name=emp.user.name,
                    email=emp.user.email,
                    employee_code=emp.employee_code,
                    department=emp.department,
                    current_job_title=emp.current_job_title,
                    years_of_experience=emp.years_of_experience,
                    bio=emp.bio,
                    created_at=emp.created_at,
                    updated_at=emp.updated_at,
                    total_skills_count=total_skills,
                    hidden_skills_count=hidden_skills,
                )
            )
        return results

    @staticmethod
    def get_employee_detail(db: Session, employee_id: str) -> EmployeeDetail:
        emp = EmployeeService.get_employee_by_id(db, employee_id)

        skill_reads = [
            EmployeeSkillRead(
                id=s.id,
                skill_id=s.skill_id,
                skill_name=s.skill.name,
                category=s.skill.category,
                proficiency=s.proficiency,
                confidence=s.confidence,
                source=s.source,
                evidence=s.evidence,
                is_hidden=s.is_hidden,
                last_updated=s.last_updated,
            )
            for s in emp.skills
        ]

        proj_reads = [
            ProjectRead(
                id=p.id,
                employee_id=p.employee_id,
                title=p.title,
                description=p.description,
                responsibilities=p.responsibilities,
                achievements=p.achievements,
                technologies=p.technologies,
                start_date=p.start_date,
                end_date=p.end_date,
            )
            for p in emp.projects
        ]

        total_skills = len(skill_reads)
        hidden_skills = sum(1 for s in skill_reads if s.is_hidden)

        return EmployeeDetail(
            id=emp.id,
            user_id=emp.user_id,
            name=emp.user.name,
            email=emp.user.email,
            employee_code=emp.employee_code,
            department=emp.department,
            current_job_title=emp.current_job_title,
            years_of_experience=emp.years_of_experience,
            bio=emp.bio,
            created_at=emp.created_at,
            updated_at=emp.updated_at,
            total_skills_count=total_skills,
            hidden_skills_count=hidden_skills,
            skills=skill_reads,
            projects=proj_reads,
        )

    @staticmethod
    def update_employee(db: Session, employee_id: str, update_in: EmployeeUpdate) -> Employee:
        emp = EmployeeService.get_employee_by_id(db, employee_id)
        if update_in.department is not None:
            emp.department = update_in.department
        if update_in.current_job_title is not None:
            emp.current_job_title = update_in.current_job_title
        if update_in.years_of_experience is not None:
            emp.years_of_experience = update_in.years_of_experience
        if update_in.bio is not None:
            emp.bio = update_in.bio
        db.commit()
        db.refresh(emp)
        return emp

    # Projects
    @staticmethod
    def add_project(db: Session, employee_id: str, project_in: ProjectCreate) -> Project:
        emp = EmployeeService.get_employee_by_id(db, employee_id)
        project = Project(
            id=str(uuid.uuid4()),
            employee_id=emp.id,
            title=project_in.title,
            description=project_in.description,
            responsibilities=project_in.responsibilities,
            achievements=project_in.achievements,
            technologies=project_in.technologies,
            start_date=project_in.start_date,
            end_date=project_in.end_date,
        )
        db.add(project)
        db.commit()
        db.refresh(project)
        return project

    @staticmethod
    def update_project(db: Session, project_id: str, project_in: ProjectUpdate) -> Project:
        proj = db.query(Project).filter(Project.id == project_id).first()
        if not proj:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
        for field, val in project_in.model_dump(exclude_unset=True).items():
            setattr(proj, field, val)
        db.commit()
        db.refresh(proj)
        return proj

    @staticmethod
    def delete_project(db: Session, project_id: str) -> None:
        proj = db.query(Project).filter(Project.id == project_id).first()
        if not proj:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
        db.delete(proj)
        db.commit()


employee_service = EmployeeService()
