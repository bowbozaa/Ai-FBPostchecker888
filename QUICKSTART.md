# Quick Start Guide

This guide will help you get Ai-FBPostchecker888 up and running in under 15 minutes.

## Prerequisites Checklist

Before you start, make sure you have:
- [ ] Python 3.8 or higher installed
- [ ] A Facebook account with access to a Facebook page
- [ ] A LINE account
- [ ] A Google account

## Step-by-Step Setup

### 1. Install the Application (2 minutes)

```bash
# Clone the repository
git clone https://github.com/bowbozaa/Ai-FBPostchecker888.git
cd Ai-FBPostchecker888

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Get Your API Credentials (10 minutes)

#### Facebook Access Token (3 minutes)
1. Go to https://developers.facebook.com/
2. Create an app (select "Business" type)
3. Go to Graph API Explorer
4. Select your app, add permissions: `pages_read_engagement`
5. Generate token and copy it

#### LINE Notify Token (2 minutes)
1. Go to https://notify-bot.line.me/
2. Login → My page → Generate token
3. Name it "FB Post Checker"
4. Select chat room for notifications
5. Copy the token

#### Google Service Account (5 minutes)
1. Go to https://console.cloud.google.com/
2. Create/select a project
3. Enable "Google Sheets API"
4. Create Service Account → Generate JSON key
5. Download the JSON file
6. Create a Google Sheet and share it with the service account email (from JSON)

### 3. Configure the Application (2 minutes)

```bash
# Copy example config
cp config/config.example.json config/config.json

# Edit config/config.json with your credentials
# - Add Facebook access token and page ID
# - Add LINE token
# - Add path to Google credentials JSON and Sheet ID
# - Customize banned keywords
```

### 4. Run Your First Check (1 minute)

```bash
python run_checker.py
```

You should see:
- Console output showing the checker is running
- LINE notifications for any flagged posts
- New entries in your Google Sheet

## What's Next?

- **Customize banned keywords**: Edit the `policy.banned_keywords` array in `config/config.json`
- **Schedule automated checks**: Set up a cron job or scheduled task (see README.md)
- **Monitor your logs**: Check your Google Sheet to see the analysis history

## Troubleshooting

**"ImportError: No module named 'facebook'"**
→ Make sure you activated the virtual environment: `source venv/bin/activate`

**"Error validating access token"**
→ Generate a new access token from Facebook Graph API Explorer

**"PERMISSION_DENIED" from Google Sheets**
→ Share your Google Sheet with the service account email (found in the JSON file)

**No LINE notifications received**
→ Check that LINE Notify is added to the correct chat room

For more help, see the full [README.md](README.md) or open an issue on GitHub.
