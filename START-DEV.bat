@echo off
echo ========================================
echo   AI Facebook Post Checker 888
echo   Starting Development Server...
echo ========================================
echo.

echo [1/3] Killing old node processes...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] Starting Vite dev server...
echo.
echo Server will start at: http://localhost:3000
echo.
echo Available pages:
echo   - Home:            http://localhost:3000/
echo   - AI Chat:         http://localhost:3000/ai-chat
echo   - AI Settings:     http://localhost:3000/ai-settings
echo   - FB Post Checker: http://localhost:3000/fb-post-checker
echo   - Dashboard:       http://localhost:3000/fb-checker-dashboard
echo   - Monitoring:      http://localhost:3000/fb-monitoring
echo.
echo ========================================
echo.

cd /d "%~dp0"
npm run dev

pause
