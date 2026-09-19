# SkillRadar Fullstack Launch Script
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  SkillRadar — Beyond Titles. Discover Talent." -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$rootPath = $PSScriptRoot

Write-Host "[1/2] Starting FastAPI Backend on http://localhost:8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath\backend'; ..\.venv\Scripts\uvicorn app.main:app --reload --port 8000"

Write-Host "[2/2] Starting React Frontend on http://localhost:5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath\frontend'; npm run dev"

Write-Host ""
Write-Host "Services successfully initiated!" -ForegroundColor Cyan
Write-Host "  Web App UI:      http://localhost:5173" -ForegroundColor White
Write-Host "  API Docs:        http://localhost:8000/docs" -ForegroundColor White
Write-Host "  Alternative API: http://localhost:8000/redoc" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Cyan
