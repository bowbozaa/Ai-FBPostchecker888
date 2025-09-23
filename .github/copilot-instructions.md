# AI-FBPostchecker888 Copilot Instructions

## Project Overview
This is a dual-stack social media risk monitoring system that analyzes Facebook posts for policy violations and risk levels, with automated notifications and logging.

**Architecture**: React/TypeScript frontend + Python backend + external integrations (Facebook API, LINE Notify, Google Sheets, n8n)

**Development Status**: Active development on both frontend (feature-complete dashboard) and backend (Facebook API integration in progress)

## Key Components & Boundaries

### Backend (Python)
- **`src/post_checker.py`**: Main PostChecker class with integrated Facebook monitoring, policy detection, LINE notifications, and Google Sheets logging
- **Implementation**: Single-class design with internal methods for each service (Google Sheets, LINE, Facebook API simulation)
- **Policy Detection**: Simple keyword matching against `banned_keywords` list from config
- **Configuration**: `config/config.json` (copy from `config.example.json`) contains all API tokens and credentials

### Frontend (React/TypeScript)
- **`src/main.tsx`**: Entry point with React root and environment logging
- **`src/App.tsx`**: Main router with role-based permissions and authentication state
- **Pages**: Dashboard (`Home.tsx`), Settings, Stats, GrayHat analysis, N8n Builder, Post Creator
- **Services**: `src/services/` contains API clients, automation services, and integrations
- **Components**: Modular UI components in `src/components/` with shadcn/ui foundation

## Critical Setup Requirements

### Configuration Files (Required)
```bash
# Copy example config and fill with real credentials
cp config/config.example.json config/config.json
# Add Google Cloud service account JSON file
# Configure Facebook Graph API token with page permissions
# Set up LINE Notify token for notifications
```

### Build System
- **Frontend**: `npm run dev` (watch mode) or `npm run build` (production) 
- **Bundle Tool**: esbuild with PostCSS/Tailwind pipeline
- **Common Issue**: Missing component imports cause build failures - check TypeScript path resolution (`@/*` maps to `src/*`)

### Python Dependencies
```bash
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

## Integration Patterns

### PostChecker Workflow
```python
# src/post_checker.py implements this flow as a monolithic class:
checker = PostChecker(fb_token, page_id, line_token, gs_creds_file, gs_sheet_id, banned_keywords)
checker.run(limit=10)  # Orchestrates: fetch posts -> detect keywords -> send notifications -> log to sheets
# Current implementation simulates Facebook posts for testing
```

### Frontend Service Integration
- **`src/services/apiService.ts`**: Central API client with network config, timeout handling, and retry logic
- **`src/services/n8nIntegration.ts`**: Webhook-based automation workflows
- **State Management**: React state + custom hooks (no Redux) with localStorage persistence

## Development Workflows

### Frontend Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Production build (requires all components to exist)
```

### Backend Testing
```bash
python3 -m py_compile src/post_checker.py  # Syntax check
# For testing the PostChecker (requires config.json setup):
python -c "from src.post_checker import PostChecker; checker = PostChecker('token', 'page_id', 'line_token', 'creds.json', 'sheet_id', ['banned']); checker.run(limit=5)"
```

### Current Implementation Notes
- **Facebook API**: Currently uses placeholder/simulation - real Facebook Graph API integration pending
- **Risk Analysis**: Hardcoded "High" risk simulation - OpenAI integration placeholder exists
- **Google Sheets**: Fully implemented using `gspread` and service account authentication
- **LINE Notify**: Fully implemented with real HTTP API calls

### Component Development
- Use existing patterns in `src/components/ui/` (shadcn/ui components)
- Follow TypeScript interfaces defined in `src/types/`
- Import paths use `@/` alias for `src/`

## External Dependencies & APIs

### Facebook Graph API
- **Endpoint**: Used via `facebook-sdk` library in Python backend
- **Permissions**: Page read permissions required for post access
- **Rate Limits**: Built into SDK, but monitor usage in production

### Google Sheets Integration
- **Auth**: Service account credentials (JSON file)
- **Library**: `gspread` + `oauth2client` in Python
- **Pattern**: Single sheet append operations for logging

### LINE Notify
- **Simple HTTP API**: POST to `notify-api.line.me/api/notify`
- **Auth**: Bearer token in headers
- **Usage**: Real-time alerts for policy violations and high-risk posts

## Project-Specific Conventions

### Error Handling
- **Python**: Try/catch with console logging, graceful degradation for optional services
- **Frontend**: ErrorBoundary component + notification system for user feedback

### Configuration Management
- **Environment**: `src/utils/env.ts` handles config loading with development/production modes
- **Python**: JSON-based config loading directly in `src/post_checker.py` __init__ method

### Role-Based Permissions
- **Pattern**: Defined in `src/App.tsx` with role arrays ('Administrator', 'Admin', 'Manager', 'Analyst', 'Viewer')
- **Usage**: Conditional rendering and route protection based on user.permissions array

## Build Troubleshooting
- **Missing component imports**: Check actual file existence vs. import paths
- **TypeScript path resolution**: Verify `@/*` mappings in `tsconfig.json`
- **esbuild failures**: Often due to missing files - create stub components if needed for builds