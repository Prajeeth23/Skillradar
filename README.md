# 🎯 SkillRadar — Beyond Titles. Discover Talent.

> **AI-Powered Internal Talent Discovery & Career Intelligence Platform**  
> *Uncover hidden and transferable workforce capabilities trapped inside nominal job titles.*

---

## 🧭 Executive Summary

In modern organizations, employee skills are scattered across completed projects, Jira tickets, architectural reviews, and ad-hoc initiatives. Traditional HR systems view employees strictly through the prism of their static job titles:

* A **Backend Engineer** might be architecting mission-critical UX workflows and mentoring junior team members, but remains categorized solely as a Java developer.
* A **QA Automation Engineer** may have constructed full Kubernetes CI/CD pipelines and built internal Python microservices, yet is overlooked for Cloud/DevOps openings.
* A **Marketing Specialist** might be writing production SQL queries and customer churn models, but never receives consideration for Data Analyst roles.

**SkillRadar** bridges this talent gap with its proprietary **Divergence Engine** and **Explainable AI Matching**, surfacing verifiable latent skills with direct project evidence and connecting talent with internal mobility opportunities.

---

## 🏗️ Architecture & Project Structure

The repository is structured as a clean fullstack monorepo:

```text
SkillRadar/
├── backend/                      # FastAPI Backend Workspace
│   ├── app/                      # Application Source
│   │   ├── api/                  # API Endpoints Layer
│   │   │   └── routes/               # Modular REST Route Handlers
│   │   │       ├── admin.py          # Platform & tenant administration
│   │   │       ├── auth.py           # JWT Authentication & session verification
│   │   │       ├── career.py         # AI Career Assistant & recommendations
│   │   │       ├── employees.py      # Employee profiles & dossiers
│   │   │       ├── hr.py             # HR metrics, divergence reports & alerts
│   │   │       ├── matching.py       # Explainable role matching & candidate discovery
│   │   │       ├── notifications.py  # In-app notifications & talent alerts
│   │   │       ├── roles.py          # Internal job postings & skill requirements
│   │   │       ├── skill_gap.py      # Target role gap analysis & readiness scores
│   │   │       └── skills.py         # Skill taxonomy & Divergence Engine triggers
│   │   │
│   │   ├── core/                 # Core Application Infrastructure
│   │   │   ├── config.py             # Pydantic Settings & environment validation
│   │   │   ├── dependencies.py       # FastAPI dependency injection & current user
│   │   │   ├── permissions.py        # RBAC constants & permission checking
│   │   │   └── security.py           # Password hashing (bcrypt) & JWT token handling
│   │   │
│   │   ├── db/                   # Persistence Layer
│   │   │   ├── base.py               # Declarative Base & metadata registry
│   │   │   ├── session.py            # Async/sync engine & database session factory
│   │   │   └── seed.py               # Enterprise seed loader (Org, 10 employees, roles)
│   │   │
│   │   ├── models/               # SQLAlchemy 2.0 ORM Models
│   │   │   ├── employee.py           # Employee profile & organization relationship
│   │   │   ├── employee_skill.py     # Discovered skills with divergence categorization
│   │   │   ├── learning_recommendation.py # Suggested courses & stretch projects
│   │   │   ├── notification.py       # Alerts for HR and employees
│   │   │   ├── organization.py       # Multi-tenant organization model
│   │   │   ├── project.py            # Work projects & verified achievement records
│   │   │   ├── role.py               # Internal job openings
│   │   │   ├── role_match.py         # AI match score, fit tier & reasoning
│   │   │   ├── role_skill.py         # Required & preferred skills per role
│   │   │   ├── skill.py              # Canonical skill taxonomy
│   │   │   ├── skill_gap.py          # Competency deltas against target roles
│   │   │   └── user.py               # User identity & RBAC role assignments
│   │   │
│   │   ├── schemas/              # Pydantic v2 Request/Response Schemas
│   │   │   ├── auth.py, common.py, employee.py, matching.py, notification.py,
│   │   │   ├── organization.py, project.py, role.py, skill.py, skill_gap.py, user.py
│   │   │
│   │   └── services/             # Domain Services & AI Engines
│   │       ├── auth_service.py       # Authentication & user provisioning
│   │       ├── employee_service.py   # Profile queries & dossier assembly
│   │       ├── notification_service.py # Alert generation & distribution
│   │       ├── role_service.py       # Role management & requirements matching
│   │       └── ai/                   # AI Engines (Groq Cloud LLM + Fallbacks)
│   │           ├── career_assistant.py   # RAG-grounded conversational career coach
│   │           ├── divergence_engine.py  # Nominal vs Actual work contrast engine
│   │           ├── groq_service.py       # Groq Cloud API interface
│   │           ├── role_matching.py      # Explainable multi-factor talent match engine
│   │           ├── skill_extraction.py   # Project-to-skill entity extractor
│   │           └── skill_gap.py          # Competency delta & readiness calculator
│   │
│   ├── tests/                    # Automated Integration & Security Tests
│   │   ├── conftest.py           # Test database fixtures & test client
│   │   ├── test_auth.py          # Login, token validation, `/auth/me`
│   │   ├── test_career_and_gaps.py   # Gap analysis & AI career chat
│   │   ├── test_divergence.py    # Divergence Engine baseline vs actual contrast
│   │   ├── test_matching.py      # Candidate matching & explainability
│   │   └── test_rbac.py          # RBAC boundary enforcement (Admin, HR, Employee)
│   │
│   ├── Dockerfile                # Backend container specification
│   ├── pytest.ini                # Pytest configuration
│   ├── requirements.txt          # Backend dependencies
│   ├── skillradar.db             # Local SQLite database pre-seeded with talent data
│   ├── README.md                 # Backend documentation
│   └── .env                      # Backend environment variables
│
├── frontend/                     # React 19 + Vite 8 SPA Workspace
│   ├── public/                   # Static assets & web manifest
│   ├── src/
│   │   ├── api/                  # Typed Axios client & service modules
│   │   ├── assets/               # Brand imagery & UI graphics
│   │   ├── components/           # Modular UI Components
│   │   │   ├── career/           # Learning cards & career milestones
│   │   │   ├── common/           # Header, Sidebar, StatCards, Badges, Shell
│   │   │   ├── layout/           # AppShell responsive layout wrapper
│   │   │   ├── matching/         # AI analysis scan animation & candidate cards
│   │   │   └── skills/           # Divergence visualizer, hidden skill cards
│   │   ├── context/              # AuthContext (with 1-Click Switcher), NotificationContext
│   │   ├── mock/                 # Resilient fallback seed data for offline demos
│   │   ├── pages/                # Role-tailored dashboards & workflows
│   │   │   ├── admin/            # Platform & tenant oversight
│   │   │   ├── auth/             # Quick-login & persona switcher
│   │   │   ├── employee/         # Profile, Skill Gaps, Internal Jobs, AI Advisor
│   │   │   └── hr/               # HR Dashboard, Dossiers, Roles, Talent Matching
│   │   ├── types/                # TypeScript interface definitions
│   │   └── utils/                # Utility functions (`cn` tailwind merge)
│   ├── package.json              # Frontend package manifest & scripts
│   ├── vite.config.ts            # Vite configuration & dev proxy
│   └── README.md                 # Frontend documentation
│
├── docker-compose.yml            # Multi-container orchestration (PostgreSQL + Backend)
├── run_dev.bat                   # 1-Click Windows batch launcher
├── start.ps1                     # 1-Click PowerShell launcher
├── README.md                     # Monorepo architectural & user guide
└── .gitignore                    # Unified root gitignore
```

---

## ⚡ Quickstart

### Prerequisites
* **Python 3.12+**
* **Node.js 18+**
* *(Optional)* Docker Desktop & PostgreSQL

### 🚀 1-Click Startup (Windows)

Simply execute the included launcher script:
```powershell
.\run_dev.bat
# or in PowerShell:
.\start.ps1
```
This simultaneously boots the **FastAPI Backend** on port 8000 and the **React Vite UI** on port 5173 in coordinated terminals.

---

### 🛠️ Manual Step-by-Step Setup

#### 1. Backend Setup
```bash
# Enter root directory
cd SkillRadar

# Activate virtual environment
# Windows:
.\.venv\Scripts\Activate.ps1
# Linux / macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env

# Seed the database (creates users, 10 divergent employees, 4 open roles)
python -m app.db.seed

# Launch backend server
uvicorn app.main:app --reload --port 8000
```
* Interactive Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
* Alternative ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

#### 2. Frontend Setup
```bash
# Enter frontend directory
cd SkillRadar/frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
* Web Application: [http://localhost:5173](http://localhost:5173)

---

## 👥 Demo Personas & Pre-Seeded Accounts

The platform includes **1-Click Persona Switching** right from the login screen and global header:

| Role | Name | Email | Password | Notable Divergence Scenario |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | Platform Admin | `admin@acme.com` | `admin123` | Platform oversight & tenant management |
| **HR** | Sarah Jenkins | `hr.sarah@acme.com` | `hr123` | Talent intelligence, role matching & gap diagnostics |
| **Employee** | Marcus Vance | `marcus.vance@acme.com` | `employee123` | *Backend Developer* ➔ Discovered **UX Design**, **Mentorship**, **Incident Triage** |
| **Employee** | Elena Rostova | `elena.rostova@acme.com` | `employee123` | *QA Automation* ➔ Discovered **CI/CD Pipelines**, **Python FastAPI**, **Docker** |
| **Employee** | Sophia Chen | `sophia.chen@acme.com` | `employee123` | *Marketing Specialist* ➔ Discovered **SQL Analytics**, **Customer Churn Modeling**, **Dashboards** |
| **Employee** | Priya Sharma | `priya.sharma@acme.com` | `employee123` | *Customer Support* ➔ Discovered **SQL Debugging**, **Technical Documentation**, **Triage** |
| **Employee** | Liam O'Connor | `liam.oconnor@acme.com` | `employee123` | *Junior Frontend* ➔ Discovered **Design Tokens**, **Accessibility (a11y) Auditing** |

---

## 🧠 Core AI Engines

### 1. Divergence Engine (`app/services/ai/divergence_engine.py`)
Contrasts an employee's nominal job baseline against unstructured project telemetry and achievements. Categorizes each skill into:
* **EXPLICIT**: Expected from the nominal title (e.g. SQL for a DBA).
* **HIDDEN**: Competencies demonstrated across real deliverables not reflected in the job title.
* **TRANSFERABLE**: Core meta-skills that apply across technical and managerial domains.
* *Grounding*: Every identified skill cites the exact project title and excerpt evidence.

### 2. Explainable Role Matching (`app/services/ai/role_matching.py`)
Evaluates internal candidates for open requisitions based on:
$$\text{Total Score} = 0.5 \times \text{Skill Match} + 0.3 \times \text{Experience Match} + 0.2 \times \text{Growth Potential}$$
Generates a human-readable **"Why this candidate matches"** explanation synthesizing hidden capabilities.

### 3. Competency Gap Diagnostics (`app/services/ai/skill_gap.py`)
Computes proficiency deltas between an employee's verified dossier and role criteria, producing an overall **Readiness Score (%)** and prioritized development trajectory.

### 4. AI Career Assistant (`app/services/ai/career_assistant.py`)
A conversational coach grounded in the employee's actual verified projects and skills. Proactively guides the employee toward internal openings and recommended courses.

---

## 🧪 Testing & Verification

Run the comprehensive integration and security test suite:
```bash
pytest -v
```

```text
tests/test_auth.py::test_health_check PASSED                             [  5%]
tests/test_auth.py::test_login_success PASSED                            [ 11%]
tests/test_auth.py::test_login_invalid_password PASSED                   [ 17%]
tests/test_auth.py::test_auth_me_endpoint PASSED                         [ 23%]
tests/test_career_and_gaps.py::test_skill_gap_analysis PASSED            [ 29%]
tests/test_career_and_gaps.py::test_career_assistant_chat PASSED         [ 35%]
tests/test_divergence.py::test_divergence_engine_analysis PASSED         [ 41%]
tests/test_divergence.py::test_hr_receives_notification_on_hidden_skill PASSED [ 47%]
tests/test_matching.py::test_role_matching_for_hr PASSED                 [ 52%]
tests/test_matching.py::test_employee_own_recommendations PASSED         [ 58%]
tests/test_rbac.py::test_admin_can_access_admin_routes PASSED            [ 64%]
tests/test_rbac.py::test_employee_cannot_access_admin_routes PASSED      [ 70%]
tests/test_rbac.py::test_hr_cannot_access_admin_routes PASSED            [ 76%]
tests/test_rbac.py::test_employee_cannot_access_hr_endpoints PASSED      [ 82%]
tests/test_rbac.py::test_hr_can_access_hr_endpoints PASSED               [ 88%]
tests/test_rbac.py::test_employee_can_view_own_profile PASSED            [ 94%]
tests/test_rbac.py::test_employee_cannot_view_other_employee_dossier PASSED [100%]

======================= 17 passed in 3.85s ========================
```

---

## 🔒 Security & Privacy Governance
* **Strict RBAC**: API route guards ensure employees cannot view other employees' dossiers or HR analytics.
* **Token Expiration**: Signed HS256 JWT tokens with configurable TTL.
* **Credential Protection**: Direct bcrypt password hashing with safe truncation for long input defense.
* **Zero Production Hallucination**: AI engines default to grounded deterministic seed structures when offline or when no external LLM API key is present.
