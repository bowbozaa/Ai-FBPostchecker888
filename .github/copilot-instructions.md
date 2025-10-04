# GitHub Copilot Instructions for Ai-FBPostchecker888

## Project Overview

This is a Facebook post risk analysis system that uses AI to detect policy violations, classify risk levels, send notifications via LINE, and log results to Google Sheets automatically.

The system consists of:
- **Facebook Graph API integration** for fetching posts
- **Policy detection** using rule-based keyword matching
- **Risk classification** for identifying high-risk content
- **LINE Notify integration** for alerts
- **Google Sheets integration** for logging and persistence

## Technology Stack

### Backend (Python)
- Python 3.x with type hints
- Third-party libraries:
  - `facebook-sdk` - Facebook Graph API client
  - `requests` - HTTP client for LINE Notify
  - `gspread` - Google Sheets API
  - `oauth2client` - Google authentication

### Frontend (TypeScript/React)
- React 18.3.1
- TypeScript with strict typing
- Tailwind CSS for styling
- Radix UI components
- React Router for navigation
- esbuild for bundling

## Code Style and Conventions

### Python Code Style

1. **Imports**: Always use `from __future__ import annotations` for forward compatibility
2. **Type Hints**: Use modern type hints with `|` for unions (e.g., `str | None`)
3. **Docstrings**: 
   - Use triple-quoted docstrings for all classes and functions
   - Follow Google/Sphinx style for parameter documentation
   - Use reStructuredText markup (e.g., `:class:`, backticks for code)
4. **Class Structure**:
   - Single responsibility per class
   - Use dataclasses for simple data containers
   - Private attributes use single underscore prefix (e.g., `_keywords`)
5. **Error Handling**:
   - Use try-except for optional dependencies with pragma comments
   - Raise descriptive ImportError messages for missing dependencies
6. **String Formatting**: Use f-strings for string interpolation

### TypeScript/React Code Style

1. Use functional components with TypeScript
2. Leverage Radix UI components for UI elements
3. Apply Tailwind CSS utility classes for styling
4. Use React hooks appropriately (useState, useEffect, etc.)

## Architecture Patterns

### Dependency Injection
- Main classes accept dependencies through constructor parameters
- Example: `PostChecker` accepts clients for Facebook, LINE, and Google Sheets

### Optional Dependencies
- Libraries like `facebook-sdk` and `gspread` are conditionally imported
- Use `# pragma: no cover` comments for import exception handlers
- Set to `None` with `# type: ignore` when imports fail

### Configuration Management
- Configuration stored in JSON files
- Use dataclasses to represent configuration (`Config` class)
- Default config example in `config/config.example.json`
- Actual config in `config/config.json` (gitignored)

## Module Organization

```
src/
├── config_loader.py       # Configuration utilities
├── facebook_client.py     # Facebook Graph API wrapper
├── policy_detector.py     # Policy violation detection
├── post_checker.py        # Main orchestration
├── line_notifier.py       # LINE Notify integration
└── google_sheets_logger.py # Google Sheets logging
```

## Common Patterns

### API Client Pattern
All external API integrations follow a similar pattern:
1. Initialize with credentials in constructor
2. Provide simple, focused methods for specific operations
3. Handle errors appropriately and raise for status

### Configuration Loading
```python
config = load_config("config/config.json")
checker = PostChecker(
    fb_token=config.facebook_token,
    page_id=config.facebook_page_id,
    # ... other config values
)
```

## Security Considerations

1. **Never commit secrets**: All tokens and credentials go in `config/config.json` (gitignored)
2. **Service account credentials**: Google Cloud credentials stored separately and referenced by path
3. **Token handling**: API tokens passed through configuration, never hardcoded

## External Integrations

### Facebook Graph API
- Version: 3.1
- Fetches posts from a configured page
- Requires access token with appropriate permissions

### LINE Notify API
- Sends push notifications
- Requires LINE Notify token
- Endpoint: `https://notify-api.line.me/api/notify`

### Google Sheets API
- Uses service account authentication
- OAuth2 scope: spreadsheets and drive
- Appends rows to configured sheet

## When Contributing

1. **Maintain type hints**: All functions should have complete type annotations
2. **Add docstrings**: Document all public classes and methods
3. **Follow existing patterns**: Match the style of similar existing code
4. **Handle optional dependencies**: Use try-except for imports that might not be installed
5. **Keep classes focused**: Each class should have a single, clear responsibility
6. **Use modern Python**: Leverage Python 3.10+ features like union types with `|`

## Testing Guidelines

Currently, the project does not have a formal test suite. When adding tests:
- Use `pytest` as the testing framework
- Mock external API calls (Facebook, LINE, Google Sheets)
- Focus on testing business logic in `PolicyDetector` and `RiskClassifier`
- Use `# pragma: no cover` for import guards in test coverage

## Build and Development

### Python Setup
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Setup
```bash
npm install
npm run dev      # Development mode
npm run build    # Production build
```

## Common Tasks

### Adding a New API Integration
1. Create a new module in `src/`
2. Follow the client pattern (see `facebook_client.py` or `line_notifier.py`)
3. Use try-except for optional imports
4. Add configuration to `config.example.json`
5. Update `Config` dataclass in `config_loader.py`

### Modifying Policy Rules
- Policy detection logic in `PolicyDetector` class
- Risk classification logic in `RiskClassifier` class
- Both use simple rule-based approaches suitable for extension

### Adding New Configuration
1. Add to `config/config.example.json`
2. Update `Config` dataclass
3. Update `load_config` function to parse new field
