import re
from typing import List, Dict

# Knowledge base of recognized skills across common tech, business, and operational domains
SKILL_TAXONOMY = {
    # Technical & Engineering
    "Python": {"category": "Technical", "keywords": ["python", "fastapi", "django", "flask", "pandas", "numpy"]},
    "PostgreSQL": {"category": "Technical", "keywords": ["postgres", "postgresql", "sql", "psql"]},
    "REST APIs": {"category": "Technical", "keywords": ["rest", "api", "apis", "endpoints", "fastapi", "restful"]},
    "FastAPI": {"category": "Technical", "keywords": ["fastapi", "uvicorn", "starlette"]},
    "Docker & Containerization": {"category": "Technical", "keywords": ["docker", "container", "containers", "dockerfile"]},
    "CI/CD Pipelines": {"category": "Technical", "keywords": ["ci/cd", "github actions", "jenkins", "pipeline", "devops", "automation"]},
    "Test Automation": {"category": "Technical", "keywords": ["pytest", "selenium", "cypress", "unit test", "automation testing"]},
    "React & Frontend": {"category": "Technical", "keywords": ["react", "frontend", "javascript", "typescript", "ui component"]},
    "SQL Analytics": {"category": "Technical", "keywords": ["sql query", "complex queries", "aggregations", "bigquery", "data modeling"]},
    "Cloud Architecture": {"category": "Technical", "keywords": ["aws", "gcp", "azure", "cloud", "serverless"]},
    "System Performance Tuning": {"category": "Technical", "keywords": ["optimization", "latency", "bottleneck", "throughput", "indexing"]},
    
    # Transferable & Interpersonal / Strategic
    "UX Collaboration": {"category": "Interpersonal", "keywords": ["ux", "checkout flow", "user experience", "friction", "wireframe", "design empathy"]},
    "Technical Mentorship": {"category": "Leadership", "keywords": ["mentor", "mentored", "onboarded", "coached junior", "guidance"]},
    "Cross-Functional Leadership": {"category": "Leadership", "keywords": ["led", "aligned teams", "stakeholder", "cross-functional", "spearheaded"]},
    "Production Incident Triage": {"category": "Technical", "keywords": ["production issue", "incident", "outage", "post-mortem", "debugging production"]},
    "Data Storytelling": {"category": "Domain", "keywords": ["dashboard", "tableau", "insights", "metrics presentation", "executive reporting"]},
    "Customer Churn Analysis": {"category": "Domain", "keywords": ["churn", "retention", "cohort analysis", "customer lifetime"]},
    "Technical Documentation": {"category": "Domain", "keywords": ["docs", "rfc", "documentation", "api specs", "architecture diagram"]},
}


class SkillExtractionService:
    @staticmethod
    def extract_from_text(text: str) -> List[Dict[str, str]]:
        """Heuristic extractor matching work text against canonical skills taxonomy."""
        extracted = []
        lowered_text = text.lower()

        for skill_name, meta in SKILL_TAXONOMY.items():
            for kw in meta["keywords"]:
                pattern = r"\b" + re.escape(kw) + r"\b"
                if re.search(pattern, lowered_text):
                    extracted.append({
                        "name": skill_name,
                        "category": meta["category"],
                    })
                    break

        return extracted


skill_extraction_service = SkillExtractionService()
