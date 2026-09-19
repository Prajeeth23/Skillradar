# 🏆 SkillRadar — 3-Minute Hackathon Demo & Pitch Script

> **Tagline**: Beyond Titles. Discover Talent.  
> **Target Audience**: Hackathon Judges, VP of Engineering, Chief People Officers.

---

## ⏱️ Pitch Timeline Overview

| Time | Phase | Focus Screen | Key Talking Point |
| :--- | :--- | :--- | :--- |
| **0:00 - 0:40** | The Problem | Intro / HR Dashboard | Employees are trapped in static job titles; skills are hidden in completed projects. |
| **0:40 - 1:25** | The Divergence Engine | Employee Dossier (Marcus Vance) | Contrasting nominal job title against actual work telemetry to extract evidence-backed hidden skills. |
| **1:25 - 2:05** | Explainable Role Matching | HR Talent Matching | "Why this employee matches" — discovering non-obvious candidates for senior openings. |
| **2:05 - 2:40** | Employee Empowerment | Employee AI Career Coach | Personalized career mobility, skill gap diagnostics, and conversational guidance. |
| **2:40 - 3:00** | Tech & Architecture | Architecture Slide / Swagger Docs | FastAPI + React 19 + Groq Cloud LLM + SQLAlchemy + 100% test coverage. |

---

## 🎙️ Detailed Step-by-Step Script

### Phase 1: The Hook (0:00 - 0:40)
* **Action**: Open [http://localhost:5173](http://localhost:5173) (Logged in as **Sarah Jenkins - HR Lead**).
* **Narrative**:
  > *"Every company complains about talent shortages and massive hiring costs. But here's the reality: **the talent you need is already working for you—it's just hidden behind rigid job titles.**  
  > If someone's title is 'Backend Developer', your HR system treats them like a backend developer forever. But in reality, they've been running UX reviews, mentoring juniors, and managing incident triages. That's why we built **SkillRadar**."*

---

### Phase 2: The Divergence Engine (0:40 - 1:25)
* **Action**:
  1. Click **Talent Directory** in the sidebar.
  2. Click on **Marcus Vance**.
  3. Scroll down to the **Divergence Visualizer** and **Hidden & Transferable Skills** cards.
* **Narrative**:
  > *"Meet Marcus Vance. His nominal title is 'Backend Developer'. Traditional ATS systems would only match him to Java or Python API roles.  
  > But look at our **Divergence Engine**: SkillRadar analyzed his actual project records and discovered that 50% of his active competencies are **Beyond-Title Skills**.  
  > Notice the badge: **'Discovered Beyond Title: UX Empathy & Design Collaboration'**.  
  > And this isn't hallucinated—SkillRadar provides the exact **Project Evidence**: 'Partnered directly with product designers to simplify checkout transitions, improving completion rates by 18%.' Every single skill is verifiable."*

---

### Phase 3: Explainable Role Matching (1:25 - 2:05)
* **Action**:
  1. Click **Talent Matching** in the sidebar.
  2. Select the requisition: **Lead Product Architect & Platform Strategist**.
  3. Click **Scan & Match Talent**.
  4. Point to the **Why this candidate matches** explanation.
* **Narrative**:
  > *"Now let's switch to the recruiter's perspective. We have an opening for a cross-functional Technical Lead.  
  > When HR runs our matching engine, SkillRadar doesn't just do keyword matching. It computes a composite score factoring in explicit skills, hidden competencies, and growth potential.  
  > Most importantly, it gives HR an **Explainable Reason**: 'Marcus combines robust backend systems knowledge with unexpected UX empathy and mentoring leadership, making him an ideal internal mobility candidate.' We save the company months of external recruiting."*

---

### Phase 4: Employee AI Career Coach (2:05 - 2:40)
* **Action**:
  1. In the top-right header, click the Persona Switcher and select **Marcus Vance (Employee)**.
  2. Click **AI Career Advisor** in the sidebar.
  3. Type or click: *"What roles can I transition to next based on my projects?"*
* **Narrative**:
  > *"SkillRadar works both ways. It also empowers the employee.  
  > We seamlessly switch to Marcus's perspective. He has access to an AI Career Advisor grounded strictly in his verified accomplishments.  
  > The coach recognizes that he has proven leadership and design capabilities, diagnoses his competency gaps, and recommends stretch assignments and internal openings to keep him growing at the company."*

---

### Phase 5: Closing & Technical Excellence (2:40 - 3:00)
* **Action**: Show [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger API docs) or terminal with 17 passing tests.
* **Narrative**:
  > *"Under the hood, SkillRadar is built on FastAPI, React 19, Tailwind CSS v4, Groq Cloud LLM with deterministic fallbacks, and a multi-tenant PostgreSQL/SQLite data model. Our test suite has 17 automated integration tests covering strict RBAC boundaries and divergence calculations.  
  > SkillRadar: Beyond Titles. Discover Talent. Thank you!"*
