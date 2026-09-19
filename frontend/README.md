# SkillRadar — Frontend Application
> AI-powered internal talent discovery and career intelligence web interface.

Built with **React 19**, **Vite 8**, **TypeScript**, **Tailwind CSS v4**, and **Lucide React**.

---

## 1. Directory Structure

```text
src/
├── api/                # Axios API services connected to backend endpoints
│   ├── auth.ts         # Authentication & profile resolution
│   ├── client.ts       # Centralized Axios client with JWT interceptor
│   ├── employees.ts    # Employee directory and dossier services
│   ├── roles.ts        # Internal role opportunities management
│   ├── matching.ts     # AI role matching & recommendations
│   ├── skills.ts       # Divergence Engine trigger & catalog
│   ├── skillGap.ts     # Target role skill-gap diagnostics
│   ├── career.ts       # Conversational AI career assistant chat
│   └── notifications.ts # In-app talent alert polling & dismissal
│
├── components/         # Reusable UI building blocks
│   ├── common/         # Header, Sidebar, ProtectedRoute, StatCard, Badge, EmptyState
│   ├── skills/         # SkillBadge, SkillProgressBar, HiddenSkillCard, DivergenceVisualizer
│   ├── matching/       # AIAnalysisLoader, MatchCandidateCard
│   ├── career/         # LearningRecCard
│   └── layout/         # AppShell frame
│
├── context/            # Global application state
│   ├── AuthContext.tsx # User session, JWT tokens, and 1-Click Demo Switcher
│   └── NotificationContext.tsx # Real-time unread alerts & mark-as-read
│
├── mock/               # Resilient fallback data matching backend seed
│   ├── users.ts        # Admin, HR, and Employee demo credentials
│   ├── employees.ts    # 10 realistic profiles with verified evidence
│   ├── roles.ts        # 4 open internal positions
│   ├── skills.ts       # Canonical skill taxonomy
│   ├── matches.ts      # Pre-computed explainable matches
│   └── notifications.ts # Seeded talent alerts
│
├── pages/              # Role-specific application views
│   ├── auth/           # LoginPage with 1-Click Demo Persona selector
│   ├── admin/          # AdminDashboard, UserManagement
│   ├── hr/             # HRDashboard, EmployeeDirectory, EmployeeDossierPage, InternalRolesPage, TalentMatchingPage, HRSkillGapsPage
│   └── employee/       # EmployeeDashboard, EmployeeProfilePage, SkillGapAnalysisPage, InternalOpportunitiesPage, CareerAssistantPage
│
├── types/              # TypeScript interface contracts
└── utils/              # Class merge utility (cn)
```

---

## 2. Quickstart

### Install Dependencies
```bash
npm install
```

### Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Start Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:5173/`.

### Production Build
```bash
npm run build
```
Compiled assets will be emitted to `dist/`.
