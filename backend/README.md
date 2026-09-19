# SkillRadar — Backend API Service

> High-performance FastAPI backend powering the Divergence Engine, explainable role matching, and AI career intelligence.

---

## 1. Directory Structure

```text
backend/
├── app/
│   ├── api/
│   │   └── routes/          # REST route handlers (admin, auth, hr, employees, roles, matching, skills, career)
│   ├── core/                # Config, dependencies, RBAC permissions, security
│   ├── db/                  # SQLAlchemy base, session factory, seed data
│   ├── models/              # SQLAlchemy 2.0 ORM models
│   ├── schemas/             # Pydantic v2 schemas
│   └── services/            # Domain logic and AI services (Divergence Engine, Groq, Matching)
├── tests/                   # Automated pytest suite (17 integration tests)
├── Dockerfile               # Backend container specification
├── pytest.ini               # Pytest configuration
├── requirements.txt         # Pinned Python dependencies
├── skillradar.db            # Pre-seeded SQLite database
└── .env                     # Environment variables
```

---

## 2. Quickstart

### Run locally with Python:
```bash
# From SkillRadar root:
cd backend
..\.venv\Scripts\uvicorn app.main:app --reload --port 8000
```

### Run automated tests:
```bash
cd backend
..\.venv\Scripts\pytest -v
```

### Interactive API Documentation:
* Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)
