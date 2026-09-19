import uuid
from datetime import datetime, date, timezone
from sqlalchemy.orm import Session

from app.db.base import Base
from app.db.session import engine, SessionLocal
from app.core.security import get_password_hash
from app.models.organization import Organization
from app.models.user import User, UserRole
from app.models.employee import Employee
from app.models.project import Project
from app.models.skill import Skill
from app.models.employee_skill import EmployeeSkill
from app.models.role import InternalRole
from app.models.role_skill import RoleSkill
from app.models.role_match import RoleMatch
from app.models.notification import Notification


def seed_database(db: Session):
    print("Seeding SkillRadar database with talent demonstration data...")

    # Ensure tables exist
    Base.metadata.create_all(bind=engine)

    # 1. Create Organization
    org = db.query(Organization).filter(Organization.name == "Acme Technologies Inc.").first()
    if not org:
        org = Organization(id=str(uuid.uuid4()), name="Acme Technologies Inc.")
        db.add(org)
        db.flush()

    # 2. Create Platform Admin
    admin = db.query(User).filter(User.email == "admin@acme.com").first()
    if not admin:
        admin = User(
            id=str(uuid.uuid4()),
            organization_id=org.id,
            name="Platform Administrator",
            email="admin@acme.com",
            password_hash=get_password_hash("admin123"),
            role=UserRole.PLATFORM_ADMIN,
            is_active=True,
        )
        db.add(admin)

    # 3. Create HR Users
    hr1 = db.query(User).filter(User.email == "hr.sarah@acme.com").first()
    if not hr1:
        hr1 = User(
            id=str(uuid.uuid4()),
            organization_id=org.id,
            name="Sarah Jenkins (HR Lead)",
            email="hr.sarah@acme.com",
            password_hash=get_password_hash("hr123"),
            role=UserRole.HR,
            is_active=True,
        )
        db.add(hr1)

    hr2 = db.query(User).filter(User.email == "hr.david@acme.com").first()
    if not hr2:
        hr2 = User(
            id=str(uuid.uuid4()),
            organization_id=org.id,
            name="David Kim (People Ops)",
            email="hr.david@acme.com",
            password_hash=get_password_hash("hr123"),
            role=UserRole.HR,
            is_active=True,
        )
        db.add(hr2)

    db.flush()

    # 4. Canonical Skills Library
    skills_data = [
        ("Python", "Technical", "High-level programming language for web, data, and automation"),
        ("PostgreSQL", "Technical", "Relational database management and query optimization"),
        ("REST APIs", "Technical", "RESTful web services and API design"),
        ("FastAPI", "Technical", "Modern high-performance web framework for APIs"),
        ("Docker & Containerization", "Technical", "Application containerization and deployment"),
        ("CI/CD Pipelines", "Technical", "Continuous integration and automated delivery pipelines"),
        ("Test Automation", "Technical", "Automated unit, integration, and end-to-end testing"),
        ("React & Frontend", "Technical", "Component-driven frontend web development"),
        ("SQL Analytics", "Technical", "Complex querying, data transformations, and metrics analysis"),
        ("Cloud Architecture", "Technical", "Cloud infrastructure design on AWS/GCP"),
        ("System Performance Tuning", "Technical", "Latency reduction, profiling, and caching"),
        ("UX Collaboration", "Interpersonal", "Designing intuitive flows in partnership with product designers"),
        ("Technical Mentorship", "Leadership", "Guiding junior engineers, code reviews, and onboarding"),
        ("Cross-Functional Leadership", "Leadership", "Aligning engineering, product, and business stakeholders"),
        ("Production Incident Triage", "Technical", "Root-cause debugging during live system outages"),
        ("Data Storytelling", "Domain", "Communicating quantitative insights through dashboards and reports"),
        ("Customer Churn Analysis", "Domain", "Cohort modeling and customer retention diagnostics"),
        ("Technical Documentation", "Domain", "Creating developer guides, architecture RFCs, and API docs"),
    ]

    skill_objs = {}
    for name, cat, desc in skills_data:
        s = db.query(Skill).filter(Skill.name == name).first()
        if not s:
            s = Skill(id=str(uuid.uuid4()), name=name, category=cat, description=desc)
            db.add(s)
            db.flush()
        skill_objs[name] = s

    # 5. Internal Opportunities / Roles
    roles_data = [
        {
            "title": "Product Engineer (Fintech)",
            "department": "Engineering",
            "description": "Bridge the gap between backend transaction systems and end-user customer experience in our payment product squad.",
            "requirements": "Strong Python API expertise combined with user empathy and cross-functional UX collaboration skills.",
            "skills": [
                ("Python", 4, "MANDATORY"),
                ("REST APIs", 4, "MANDATORY"),
                ("UX Collaboration", 3, "PREFERRED"),
                ("PostgreSQL", 3, "PREFERRED"),
            ],
        },
        {
            "title": "Platform / DevOps Engineer",
            "department": "Infrastructure",
            "description": "Design and maintain high-reliability CI/CD deployment pipelines, container clusters, and developer tooling.",
            "requirements": "Hands-on experience with automated pipelines, Linux, Python scripting, and containerized architectures.",
            "skills": [
                ("CI/CD Pipelines", 4, "MANDATORY"),
                ("Docker & Containerization", 4, "MANDATORY"),
                ("Python", 3, "PREFERRED"),
                ("Production Incident Triage", 3, "PREFERRED"),
            ],
        },
        {
            "title": "Growth & Product Analyst",
            "department": "Product",
            "description": "Drive user retention and product conversion by discovering insights in behavioral data and presenting to leadership.",
            "requirements": "Mastery of SQL analytics, retention cohort modeling, and visual dashboard storytelling.",
            "skills": [
                ("SQL Analytics", 4, "MANDATORY"),
                ("Data Storytelling", 4, "MANDATORY"),
                ("Customer Churn Analysis", 3, "PREFERRED"),
            ],
        },
        {
            "title": "Technical Support Engineer L3",
            "department": "Customer Operations",
            "description": "Handle complex customer escalations, replicate production anomalies, query backend databases, and author runbooks.",
            "requirements": "Strong technical debugging, SQL querying, production triage, and clear developer documentation skills.",
            "skills": [
                ("SQL Analytics", 3, "MANDATORY"),
                ("Production Incident Triage", 3, "MANDATORY"),
                ("Technical Documentation", 3, "PREFERRED"),
            ],
        },
    ]

    created_roles = {}
    for r_data in roles_data:
        r = db.query(InternalRole).filter(InternalRole.title == r_data["title"]).first()
        if not r:
            r = InternalRole(
                id=str(uuid.uuid4()),
                organization_id=org.id,
                title=r_data["title"],
                department=r_data["department"],
                description=r_data["description"],
                requirements=r_data["requirements"],
                status="OPEN",
                created_by=hr1.id,
            )
            db.add(r)
            db.flush()

            for sk_name, req_lvl, imp in r_data["skills"]:
                sk_obj = skill_objs.get(sk_name)
                if sk_obj:
                    rs = RoleSkill(
                        id=str(uuid.uuid4()),
                        role_id=r.id,
                        skill_id=sk_obj.id,
                        required_level=req_lvl,
                        importance=imp,
                    )
                    db.add(rs)
        created_roles[r_data["title"]] = r

    db.flush()

    # 6. Employees with Realistic Divergent Talent
    employees_seed = [
        {
            "name": "Marcus Vance",
            "email": "marcus.vance@acme.com",
            "code": "EMP-1001",
            "dept": "Engineering",
            "title": "Backend Developer",
            "yoe": 4.5,
            "bio": "Backend software engineer focused on core payment services, microservices, and transactional APIs.",
            "projects": [
                {
                    "title": "Global Payment Gateway Redesign",
                    "description": "Architected high-throughput payment processing APIs using FastAPI and PostgreSQL.",
                    "responsibilities": "Handled payment provider webhooks, idempotent transaction logic, and led debugging sessions for production timeout spikes.",
                    "achievements": "Decreased payment gateway latency by 42% and successfully eliminated duplicate charges.",
                    "technologies": "Python, FastAPI, PostgreSQL, REST APIs",
                },
                {
                    "title": "Checkout Flow Friction Reduction",
                    "description": "Cross-functional initiative to minimize checkout drop-offs.",
                    "responsibilities": "Partnered directly with product designers and the UX team to simplify multi-step checkout state transitions.",
                    "achievements": "Improved checkout completion rate by 18%; credited by Design VP for outstanding UX empathy.",
                    "technologies": "Python, UX Collaboration, REST APIs",
                },
                {
                    "title": "Engineering Onboarding & Mentorship Program",
                    "description": "Internal initiative to accelerate ramp-up for incoming backend hires.",
                    "responsibilities": "Mentored 3 junior backend engineers, held weekly 1-on-1 architecture reviews, and instituted coding standards.",
                    "achievements": "Reduced junior developer onboarding time from 8 weeks to 3 weeks.",
                    "technologies": "Technical Mentorship, Technical Documentation",
                },
            ],
            "skills": [
                ("Python", 4, False, "project", "Built payment gateway in FastAPI"),
                ("PostgreSQL", 4, False, "project", "Designed transactional schemas"),
                ("REST APIs", 4, False, "project", "Standardized RESTful microservices"),
                ("UX Collaboration", 3, True, "AI_inferred", "Partnered with UX team to redesign checkout flow"),
                ("Technical Mentorship", 4, True, "AI_inferred", "Mentored 3 junior backend engineers"),
                ("Production Incident Triage", 4, True, "AI_inferred", "Debugged production timeout spikes on live gateway"),
            ],
        },
        {
            "name": "Elena Rostova",
            "email": "elena.rostova@acme.com",
            "code": "EMP-1002",
            "dept": "Quality Assurance",
            "title": "QA Automation Engineer",
            "yoe": 3.5,
            "bio": "Specializes in end-to-end quality assurance, regression suites, and CI/CD integration.",
            "projects": [
                {
                    "title": "Automated Smoke & Regression Pipeline",
                    "description": "Built automated regression suite executing against staging deployments.",
                    "responsibilities": "Wrote comprehensive Python pytest suites and containerized test runners using Docker.",
                    "achievements": "Decreased release testing cycle from 2 days to 35 minutes.",
                    "technologies": "Python, Test Automation, Docker & Containerization",
                },
                {
                    "title": "GitHub Actions Continuous Deployment Workflow",
                    "description": "Authored CI/CD deployment orchestration when platform team was overloaded.",
                    "responsibilities": "Configured build caching, automated security scans, and preview environments for staging.",
                    "achievements": "Adopted as company-wide standard CI/CD pipeline template.",
                    "technologies": "CI/CD Pipelines, Docker & Containerization, Python",
                },
            ],
            "skills": [
                ("Test Automation", 5, False, "project", "Built automated regression suite"),
                ("Python", 4, True, "AI_inferred", "Wrote Python test automation framework"),
                ("CI/CD Pipelines", 4, True, "AI_inferred", "Configured GitHub Actions deployment workflow"),
                ("Docker & Containerization", 4, True, "AI_inferred", "Containerized test runners and deployment environments"),
            ],
        },
        {
            "name": "Sophia Chen",
            "email": "sophia.chen@acme.com",
            "code": "EMP-1003",
            "dept": "Marketing",
            "title": "Marketing Specialist",
            "yoe": 4.0,
            "bio": "Marketing campaign strategist with deep affinity for quantitative customer insights.",
            "projects": [
                {
                    "title": "Customer Lifecycle & Churn Prevention Analysis",
                    "description": "Investigated retention anomalies across subscription tiers.",
                    "responsibilities": "Queried raw product event tables using complex SQL aggregations to identify leading churn indicators.",
                    "achievements": "Identified 3 high-risk user drop-off triggers, driving a 15% improvement in 90-day retention.",
                    "technologies": "SQL Analytics, Customer Churn Analysis",
                },
                {
                    "title": "Executive Marketing Performance Cockpit",
                    "description": "Built real-time interactive business intelligence dashboard.",
                    "responsibilities": "Synthesized CAC, LTV, and campaign ROI data into visual executive dashboards with actionable narratives.",
                    "achievements": "Adopted by Chief Marketing Officer for weekly executive strategy meetings.",
                    "technologies": "Data Storytelling, SQL Analytics",
                },
            ],
            "skills": [
                ("SQL Analytics", 4, True, "AI_inferred", "Wrote complex multi-table SQL queries over event data"),
                ("Data Storytelling", 4, True, "AI_inferred", "Created executive dashboards translating numbers into strategy"),
                ("Customer Churn Analysis", 4, True, "AI_inferred", "Modeled customer retention drops across cohorts"),
            ],
        },
        {
            "name": "Priya Sharma",
            "email": "priya.sharma@acme.com",
            "code": "EMP-1004",
            "dept": "Customer Operations",
            "title": "Customer Support Specialist",
            "yoe": 2.5,
            "bio": "Front-line customer advocate with self-taught database querying and technical diagnosis abilities.",
            "projects": [
                {
                    "title": "Tier 2 Technical Escalation Playbook",
                    "description": "Created comprehensive troubleshooting documentation for recurring billing and sync errors.",
                    "responsibilities": "Documented reproducible steps for engineering bug tickets and wrote SQL queries to verify customer account states.",
                    "achievements": "Reduced escalation resolution turnaround from 24 hours to 4 hours.",
                    "technologies": "Technical Documentation, SQL Analytics",
                },
            ],
            "skills": [
                ("SQL Analytics", 3, True, "AI_inferred", "Executed DB queries to diagnose customer account sync anomalies"),
                ("Technical Documentation", 4, True, "AI_inferred", "Authored Tier 2 escalation runbooks"),
                ("Production Incident Triage", 3, True, "AI_inferred", "Reproduced edge-case billing bugs for engineering team"),
            ],
        },
        {
            "name": "Liam O'Connor",
            "email": "liam.oconnor@acme.com",
            "code": "EMP-1005",
            "dept": "Engineering",
            "title": "Junior Frontend Developer",
            "yoe": 2.0,
            "bio": "Frontend developer who excels in accessible UI component design and user experience research.",
            "projects": [
                {
                    "title": "Design System Accessibility Upgrade",
                    "description": "Audited and rebuilt core React UI component library for WCAG 2.1 compliance.",
                    "responsibilities": "Partnered with design lead to create reusable design tokens and keyboard-navigable components.",
                    "achievements": "Achieved 100% lighthouse accessibility compliance across customer portal.",
                    "technologies": "React & Frontend, UX Collaboration",
                },
            ],
            "skills": [
                ("React & Frontend", 4, False, "project", "Built React design system components"),
                ("UX Collaboration", 4, True, "AI_inferred", "Partnered with UX team on design tokens and accessibility"),
            ],
        },
        {
            "name": "Jordan Reed",
            "email": "jordan.reed@acme.com",
            "code": "EMP-1006",
            "dept": "Operations",
            "title": "Data Analyst",
            "yoe": 3.0,
            "bio": "Operations analyst who automated internal reporting flows with Python microservices.",
            "projects": [
                {
                    "title": "Automated ETL Pipeline for Warehouse Data",
                    "description": "Automated daily CSV exports and inventory sync into PostgreSQL.",
                    "responsibilities": "Wrote Python ingestion scripts using FastAPI and Pandas.",
                    "achievements": "Saved 12 hours of manual data entry per week.",
                    "technologies": "Python, SQL Analytics, FastAPI",
                },
            ],
            "skills": [
                ("SQL Analytics", 4, False, "project", "Designed analytical queries"),
                ("Python", 3, True, "AI_inferred", "Built data ingestion microservices"),
                ("FastAPI", 3, True, "AI_inferred", "Created internal sync endpoints"),
            ],
        },
        {
            "name": "Maya Lin",
            "email": "maya.lin@acme.com",
            "code": "EMP-1007",
            "dept": "Product",
            "title": "Associate Product Manager",
            "yoe": 3.5,
            "bio": "Product manager with strong technical background in REST API architecture and developer tooling.",
            "projects": [
                {
                    "title": "Public Partner API Specification",
                    "description": "Defined product requirements and OpenAPI specs for third-party developer integration.",
                    "responsibilities": "Collaborated with engineering to define API payloads, rate limits, and authentication flows.",
                    "achievements": "Successfully onboarded 12 launch partners in first month.",
                    "technologies": "REST APIs, Cross-Functional Leadership, Technical Documentation",
                },
            ],
            "skills": [
                ("Cross-Functional Leadership", 4, False, "project", "Led partner API product launch"),
                ("REST APIs", 3, True, "AI_inferred", "Authored OpenAPI payload contracts"),
                ("Technical Documentation", 4, True, "AI_inferred", "Wrote external developer documentation"),
            ],
        },
        {
            "name": "Alex Rivera",
            "email": "alex.rivera@acme.com",
            "code": "EMP-1008",
            "dept": "Information Technology",
            "title": "IT Support Specialist",
            "yoe": 4.0,
            "bio": "IT specialist passionate about infrastructure automation and containerization.",
            "projects": [
                {
                    "title": "Internal Tooling Dockerization",
                    "description": "Migrated legacy on-premise admin tools to containerized Docker services.",
                    "responsibilities": "Wrote Dockerfiles, bash automation scripts, and basic CI/CD test triggers.",
                    "achievements": "Decreased tool deployment downtime by 90%.",
                    "technologies": "Docker & Containerization, CI/CD Pipelines",
                },
            ],
            "skills": [
                ("Docker & Containerization", 4, True, "AI_inferred", "Dockerized internal administrative tooling"),
                ("CI/CD Pipelines", 3, True, "AI_inferred", "Built build and test automation scripts"),
            ],
        },
        {
            "name": "Chloe Dupont",
            "email": "chloe.dupont@acme.com",
            "code": "EMP-1009",
            "dept": "Marketing",
            "title": "Technical Content Writer",
            "yoe": 3.0,
            "bio": "Writes developer guides and product tutorials with hands-on coding examples.",
            "projects": [
                {
                    "title": "Developer Hub & Code Sample Tutorials",
                    "description": "Created interactive tutorials demonstrating REST API integration.",
                    "responsibilities": "Wrote Python code samples, verified API responses, and designed clear diagrams.",
                    "achievements": "Increased developer portal monthly active readers by 60%.",
                    "technologies": "Technical Documentation, Python, REST APIs",
                },
            ],
            "skills": [
                ("Technical Documentation", 5, False, "project", "Created developer portal and code walkthroughs"),
                ("Python", 3, True, "AI_inferred", "Wrote functional Python API integration examples"),
                ("REST APIs", 3, True, "AI_inferred", "Documented REST endpoints and response contracts"),
            ],
        },
        {
            "name": "Lucas Silva",
            "email": "lucas.silva@acme.com",
            "code": "EMP-1010",
            "dept": "Engineering",
            "title": "Senior Backend Engineer",
            "yoe": 6.0,
            "bio": "Senior engineer focused on database scaling, architectural reviews, and developer coaching.",
            "projects": [
                {
                    "title": "Database Query Optimization & Connection Pooling",
                    "description": "Resolved critical database lock contention and query latency.",
                    "responsibilities": "Analyzed slow query logs, redesigned index strategies, and implemented PgBouncer.",
                    "achievements": "Cut p99 database response time from 1.2s to 45ms.",
                    "technologies": "PostgreSQL, System Performance Tuning, Python",
                },
                {
                    "title": "Engineering Architecture Council",
                    "description": "Co-founded internal architecture council for cross-team RFC reviews.",
                    "responsibilities": "Mentored mid-level developers through design docs and promoted best practices.",
                    "achievements": "Reviewed and approved 24 system RFCs with zero breaking schema regressions.",
                    "technologies": "Technical Mentorship, Cross-Functional Leadership",
                },
            ],
            "skills": [
                ("Python", 5, False, "project", "Led core Python microservice initiatives"),
                ("PostgreSQL", 5, False, "project", "Mastery of indexing, locks, and query optimization"),
                ("System Performance Tuning", 5, True, "AI_inferred", "Cut database latency and tuned pooling"),
                ("Technical Mentorship", 4, True, "AI_inferred", "Coached engineers across teams via Architecture Council"),
            ],
        },
    ]

    for emp_data in employees_seed:
        user = db.query(User).filter(User.email == emp_data["email"]).first()
        if not user:
            user = User(
                id=str(uuid.uuid4()),
                organization_id=org.id,
                name=emp_data["name"],
                email=emp_data["email"],
                password_hash=get_password_hash("employee123"),
                role=UserRole.EMPLOYEE,
                is_active=True,
            )
            db.add(user)
            db.flush()

            emp = Employee(
                id=str(uuid.uuid4()),
                user_id=user.id,
                employee_code=emp_data["code"],
                department=emp_data["dept"],
                current_job_title=emp_data["title"],
                years_of_experience=emp_data["yoe"],
                bio=emp_data["bio"],
            )
            db.add(emp)
            db.flush()

            # Add projects
            for p in emp_data["projects"]:
                proj = Project(
                    id=str(uuid.uuid4()),
                    employee_id=emp.id,
                    title=p["title"],
                    description=p["description"],
                    responsibilities=p.get("responsibilities"),
                    achievements=p.get("achievements"),
                    technologies=p.get("technologies"),
                    start_date=date(2023, 1, 15),
                    end_date=date(2024, 6, 30),
                )
                db.add(proj)

            # Add skills
            for sk_name, prof, is_hid, src, evid in emp_data["skills"]:
                sk_obj = skill_objs.get(sk_name)
                if sk_obj:
                    es = EmployeeSkill(
                        id=str(uuid.uuid4()),
                        employee_id=emp.id,
                        skill_id=sk_obj.id,
                        proficiency=prof,
                        confidence=0.92 if is_hid else 0.98,
                        source=src,
                        evidence=evid,
                        is_hidden=is_hid,
                        last_updated=datetime.now(timezone.utc),
                    )
                    db.add(es)

    db.commit()

    # 7. Seed Initial In-App Notifications
    # Alert HR about Marcus's hidden UX capabilities
    marcus_emp = db.query(Employee).filter(Employee.employee_code == "EMP-1001").first()
    if marcus_emp and hr1:
        existing_notif = db.query(Notification).filter(Notification.user_id == hr1.id).first()
        if not existing_notif:
            db.add(
                Notification(
                    id=str(uuid.uuid4()),
                    user_id=hr1.id,
                    type="HIDDEN_SKILL",
                    title="Hidden Skills Detected: Marcus Vance",
                    message="Divergence Engine detected high-confidence capabilities in UX Collaboration and Technical Mentorship.",
                    is_read=False,
                )
            )
            db.add(
                Notification(
                    id=str(uuid.uuid4()),
                    user_id=marcus_emp.user_id,
                    type="ROLE_MATCH",
                    title="Potential Role Match: Product Engineer (Fintech)",
                    message="Your project achievements align 86% with the Product Engineer opening.",
                    is_read=False,
                )
            )
            db.commit()

    print("Seed complete! Demo users and divergent talent loaded successfully.")
    print("Credentials:")
    print("  Platform Admin: admin@acme.com / admin123")
    print("  HR Lead:        hr.sarah@acme.com / hr123")
    print("  HR Ops:         hr.david@acme.com / hr123")
    print("  Employees:      marcus.vance@acme.com, elena.rostova@acme.com, sophia.chen@acme.com (password: employee123)")


if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
