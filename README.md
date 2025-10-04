# Ai-FBPostchecker888

An automated Facebook post monitoring system that analyzes posts for policy violations and risk assessment. The system detects banned keywords, classifies risk levels, sends real-time notifications via LINE, and logs results to Google Sheets automatically.

**ระบบวิเคราะห์ความเสี่ยงของโพสต์ Facebook ด้วย AI ตรวจจับคำผิดนโยบาย แยกระดับความเสี่ยง พร้อมแจ้งเตือนผ่าน LINE และบันทึกลง Google Sheets โดยอัตโนมัติ**

---

📚 **Quick Links**: [Quick Start Guide](QUICKSTART.md) | [FAQ](FAQ.md) | [Examples](EXAMPLES.md) | [Contributing](CONTRIBUTING.md)

---

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Facebook Developer Setup](#step-1-facebook-developer-setup)
  - [LINE Notify Setup](#step-2-line-notify-setup)
  - [Google Cloud Service Account Setup](#step-3-google-cloud-service-account-setup)
  - [Configure the Application](#step-4-configure-the-application)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## Features

- 📱 **Facebook Post Monitoring**: Automatically fetches recent posts from configured Facebook pages
- 🔍 **Policy Violation Detection**: Identifies posts containing banned keywords
- ⚠️ **Risk Classification**: Categorizes posts as high or low risk based on content
- 📬 **LINE Notifications**: Sends real-time alerts for policy violations and high-risk posts
- 📊 **Google Sheets Logging**: Maintains an automated log of all analyzed posts
- 🔧 **Configurable**: Easy configuration through JSON file

## Architecture Overview

The system consists of several modular components:

- **FacebookClient**: Interfaces with Facebook Graph API to retrieve posts
- **PolicyDetector**: Scans posts for banned keywords and policy violations
- **RiskClassifier**: Analyzes post content to determine risk level
- **LineNotifier**: Sends notifications through LINE Notify API
- **GoogleSheetsLogger**: Records analysis results to Google Sheets
- **PostChecker**: Orchestrates the entire workflow

## Prerequisites

Before you begin, ensure you have the following:

### Software Requirements
- **Python 3.8+** (recommended: Python 3.9 or higher)
- pip (Python package manager)
- Git (for cloning the repository)

### Required Accounts and Credentials

You'll need to set up accounts and obtain credentials from the following services:

1. **Facebook Developer Account**
   - A Facebook account
   - Access to the Facebook page you want to monitor

2. **LINE Notify**
   - A LINE account

3. **Google Cloud Platform**
   - A Google account
   - Access to Google Sheets API

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/bowbozaa/Ai-FBPostchecker888.git
cd Ai-FBPostchecker888
```

### 2. Set Up Python Environment

Create a virtual environment and install dependencies:

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Configuration

### Step 1: Facebook Developer Setup

1. **Create a Facebook App**:
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Click "My Apps" → "Create App"
   - Select "Business" as the app type
   - Fill in the required information

2. **Get Access Token**:
   - In your app dashboard, go to "Tools" → "Graph API Explorer"
   - Select your app from the dropdown
   - Add permissions: `pages_read_engagement`, `pages_manage_posts`
   - Click "Generate Access Token"
   - Copy the access token (keep it secure!)

3. **Get Your Page ID**:
   - Go to your Facebook page
   - Click "About" → Find your Page ID
   - Or use Graph API Explorer: `GET /me/accounts` to list all pages

### Step 2: LINE Notify Setup

1. **Get LINE Notify Token**:
   - Go to [LINE Notify](https://notify-bot.line.me/)
   - Log in with your LINE account
   - Click "My page" → "Generate token"
   - Enter a token name (e.g., "FB Post Checker")
   - Select the chat room where you want to receive notifications
   - Click "Generate token"
   - Copy the token (you won't be able to see it again!)

### Step 3: Google Cloud Service Account Setup

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google Sheets API**:
   - In the Cloud Console, go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click on it and enable it

3. **Create Service Account**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Fill in service account details and click "Create"
   - Skip optional permissions (click "Continue" and "Done")

4. **Generate Service Account Key**:
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Select "JSON" format
   - Download the JSON file and save it securely

5. **Create and Share Google Sheet**:
   - Create a new Google Sheet
   - Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Share the sheet with the service account email (found in the JSON file)
   - Give "Editor" permission

### Step 4: Configure the Application

1. **Copy the example configuration**:
   ```bash
   cp config/config.example.json config/config.json
   ```

2. **Edit `config/config.json`** and fill in your credentials:

```json
{
  "facebook": {
    "access_token": "YOUR_FACEBOOK_ACCESS_TOKEN",
    "page_id": "YOUR_FACEBOOK_PAGE_ID"
  },
  "line": {
    "token": "YOUR_LINE_NOTIFY_TOKEN"
  },
  "google_sheets": {
    "credentials_file": "path/to/your-service-account-credentials.json",
    "sheet_id": "YOUR_GOOGLE_SHEET_ID"
  },
  "policy": {
    "banned_keywords": ["spam", "scam", "fraud", "phishing"]
  }
}
```

**Configuration Fields Explained**:

- `facebook.access_token`: Your Facebook Graph API access token
- `facebook.page_id`: The ID of the Facebook page to monitor
- `line.token`: Your LINE Notify access token
- `google_sheets.credentials_file`: Path to your Google service account JSON file
- `google_sheets.sheet_id`: The ID of your Google Sheet (from the URL)
- `policy.banned_keywords`: Array of keywords to flag in posts (case-insensitive)

## Usage

### Running the Post Checker

Create a Python script (e.g., `run_checker.py`) in the project root:

```python
from src.config_loader import load_config
from src.post_checker import PostChecker

# Load configuration
config = load_config("config/config.json")

# Initialize the post checker
checker = PostChecker(
    fb_token=config.facebook_token,
    page_id=config.facebook_page_id,
    line_token=config.line_token,
    gs_creds_file=config.google_credentials_file,
    gs_sheet_id=config.google_sheet_id,
    banned_keywords=config.banned_keywords,
)

# Check the 10 most recent posts
checker.run(limit=10)
```

Run the script:

```bash
python run_checker.py
```

### What Happens When You Run It

1. **Fetches Posts**: Retrieves the most recent posts from your Facebook page
2. **Analyzes Content**: Checks each post for banned keywords and calculates risk level
3. **Sends Notifications**: If a post violates policies or is high-risk, sends a LINE notification
4. **Logs Results**: Records post ID, content, and risk level to Google Sheets

### Scheduling Automated Checks

You can schedule the checker to run periodically using cron (Linux/macOS) or Task Scheduler (Windows):

**Linux/macOS (cron)**:
```bash
# Run every hour
0 * * * * cd /path/to/Ai-FBPostchecker888 && /path/to/venv/bin/python run_checker.py
```

**Windows (Task Scheduler)**:
Create a scheduled task that runs:
```
C:\path\to\venv\Scripts\python.exe C:\path\to\Ai-FBPostchecker888\run_checker.py
```

## Troubleshooting

### Common Issues

**1. Import Errors**
```
ImportError: No module named 'facebook'
```
**Solution**: Make sure you've activated the virtual environment and installed dependencies:
```bash
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

**2. Facebook API Errors**
```
facebook.GraphAPIError: Error validating access token
```
**Solution**: 
- Verify your access token is correct and hasn't expired
- Facebook access tokens expire; you may need to generate a new one
- Ensure your app has the required permissions

**3. Google Sheets Permission Error**
```
gspread.exceptions.APIError: PERMISSION_DENIED
```
**Solution**:
- Make sure you've shared the Google Sheet with your service account email
- The email is in the format: `xxxxx@xxxxx.iam.gserviceaccount.com`
- Grant "Editor" access

**4. LINE Notification Not Received**
**Solution**:
- Verify your LINE Notify token is correct
- Check that the token hasn't been revoked
- Ensure LINE Notify is added to your selected chat room

**5. Config File Not Found**
```
FileNotFoundError: config/config.json
```
**Solution**:
- Make sure you've copied `config.example.json` to `config.json`
- Verify the path is correct relative to where you're running the script

### Debugging Tips

- **Enable verbose logging**: Add print statements in your script to see what's happening
- **Test each component separately**: Try using each API client independently
- **Check API quotas**: Facebook, Google Sheets, and LINE all have rate limits
- **Verify credentials**: Double-check all tokens and IDs are correctly copied

## Project Structure

```
Ai-FBPostchecker888/
├── config/
│   ├── config.example.json    # Example configuration file
│   └── config.json            # Your actual config (not in git)
├── src/
│   ├── __init__.py
│   ├── config_loader.py       # Configuration loading utilities
│   ├── facebook_client.py     # Facebook Graph API client
│   ├── google_sheets_logger.py # Google Sheets logging
│   ├── line_notifier.py       # LINE notification service
│   ├── policy_detector.py     # Policy violation & risk detection
│   └── post_checker.py        # Main orchestration logic
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source. Please check the repository for license information.

## Support

If you encounter any issues or have questions:

1. Check the Troubleshooting section above
2. Search existing issues on GitHub
3. Open a new issue with detailed information about your problem

---

**Note**: This system is designed for monitoring and policy compliance. Always respect privacy laws and Facebook's Terms of Service when using this tool.
