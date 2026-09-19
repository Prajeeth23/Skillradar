@echo off
TITLE SkillRadar Launcher
echo ========================================================
echo   SkillRadar - Beyond Titles. Discover Talent.
echo ========================================================
echo.
echo Starting Backend API (FastAPI) on http://localhost:8000 ...
start "SkillRadar Backend API" cmd /k "cd /d %~dp0backend && ..\.venv\Scripts\uvicorn app.main:app --reload --port 8000"

echo Starting Frontend UI (Vite + React) on http://localhost:5173 ...
start "SkillRadar Frontend UI" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo All services launched!
echo - Frontend: http://localhost:5173
echo - Backend API: http://localhost:8000
echo - Swagger Docs: http://localhost:8000/docs
echo ========================================================
