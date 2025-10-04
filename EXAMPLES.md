# Examples and Extensions

This document provides examples of how to extend and customize Ai-FBPostchecker888 for different use cases.

## Example 1: Custom Risk Classifier with Machine Learning

Instead of the simple keyword-based risk classifier, you could integrate a machine learning model:

```python
# custom_classifier.py
from transformers import pipeline

class MLRiskClassifier:
    """Risk classifier using a sentiment analysis model."""
    
    def __init__(self):
        # Using a pre-trained sentiment model as an example
        self.classifier = pipeline("sentiment-analysis")
    
    def classify(self, text: str) -> str:
        """Classify risk based on sentiment analysis."""
        result = self.classifier(text)[0]
        
        # Map sentiment to risk
        if result['label'] == 'NEGATIVE' and result['score'] > 0.8:
            return "high"
        return "low"

# Usage in your script:
from src.config_loader import load_config
from src.post_checker import PostChecker
from custom_classifier import MLRiskClassifier

config = load_config("config/config.json")

# Create PostChecker but replace the classifier
checker = PostChecker(
    fb_token=config.facebook_token,
    page_id=config.facebook_page_id,
    line_token=config.line_token,
    gs_creds_file=config.google_credentials_file,
    gs_sheet_id=config.google_sheet_id,
    banned_keywords=config.banned_keywords,
)

# Replace the default classifier
checker.classifier = MLRiskClassifier()

checker.run(limit=10)
```

## Example 2: Multiple Notification Channels

Send notifications to multiple services (LINE, Slack, Email):

```python
# multi_notifier.py
import requests
import smtplib
from email.mime.text import MIMEText

class MultiNotifier:
    """Send notifications to multiple channels."""
    
    def __init__(self, line_token, slack_webhook, email_config):
        self.line_token = line_token
        self.slack_webhook = slack_webhook
        self.email_config = email_config
    
    def send(self, message: str) -> None:
        """Send to all configured channels."""
        self._send_line(message)
        self._send_slack(message)
        self._send_email(message)
    
    def _send_line(self, message: str) -> None:
        """Send to LINE Notify."""
        requests.post(
            "https://notify-api.line.me/api/notify",
            headers={"Authorization": f"Bearer {self.line_token}"},
            data={"message": message},
        )
    
    def _send_slack(self, message: str) -> None:
        """Send to Slack webhook."""
        requests.post(
            self.slack_webhook,
            json={"text": message}
        )
    
    def _send_email(self, message: str) -> None:
        """Send email notification."""
        msg = MIMEText(message)
        msg['Subject'] = 'FB Post Alert'
        msg['From'] = self.email_config['from']
        msg['To'] = self.email_config['to']
        
        with smtplib.SMTP(self.email_config['smtp_server']) as server:
            server.send_message(msg)

# Usage:
from src.config_loader import load_config
from src.post_checker import PostChecker
from multi_notifier import MultiNotifier

config = load_config("config/config.json")

notifier = MultiNotifier(
    line_token=config.line_token,
    slack_webhook="https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
    email_config={
        'from': 'alerts@example.com',
        'to': 'admin@example.com',
        'smtp_server': 'smtp.gmail.com'
    }
)

checker = PostChecker(
    fb_token=config.facebook_token,
    page_id=config.facebook_page_id,
    line_token=config.line_token,
    gs_creds_file=config.google_credentials_file,
    gs_sheet_id=config.google_sheet_id,
    banned_keywords=config.banned_keywords,
)

checker.notifier = notifier
checker.run(limit=10)
```

## Example 3: Checking Multiple Pages

Monitor multiple Facebook pages in one script:

```python
# multi_page_checker.py
from src.config_loader import load_config
from src.post_checker import PostChecker

def check_multiple_pages(pages_config):
    """Check multiple Facebook pages."""
    
    for page in pages_config:
        print(f"Checking page: {page['name']}")
        
        checker = PostChecker(
            fb_token=page['access_token'],
            page_id=page['page_id'],
            line_token=page['line_token'],
            gs_creds_file=page['gs_creds_file'],
            gs_sheet_id=page['gs_sheet_id'],
            banned_keywords=page['banned_keywords'],
        )
        
        checker.run(limit=10)
        print(f"Completed checking {page['name']}")

# Configuration for multiple pages
pages = [
    {
        'name': 'Main Company Page',
        'access_token': 'TOKEN1',
        'page_id': 'PAGE_ID_1',
        'line_token': 'LINE_TOKEN_1',
        'gs_creds_file': 'creds.json',
        'gs_sheet_id': 'SHEET_ID_1',
        'banned_keywords': ['spam', 'scam']
    },
    {
        'name': 'Product Page',
        'access_token': 'TOKEN2',
        'page_id': 'PAGE_ID_2',
        'line_token': 'LINE_TOKEN_2',
        'gs_creds_file': 'creds.json',
        'gs_sheet_id': 'SHEET_ID_2',
        'banned_keywords': ['fake', 'counterfeit']
    }
]

check_multiple_pages(pages)
```

## Example 4: Adding Database Storage

Store results in a database instead of (or in addition to) Google Sheets:

```python
# database_logger.py
import sqlite3
from datetime import datetime

class DatabaseLogger:
    """Log post analysis to SQLite database."""
    
    def __init__(self, db_path="posts.db"):
        self.conn = sqlite3.connect(db_path)
        self._create_table()
    
    def _create_table(self):
        """Create posts table if it doesn't exist."""
        self.conn.execute("""
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                post_id TEXT NOT NULL,
                message TEXT,
                risk TEXT,
                checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        self.conn.commit()
    
    def log(self, post_id: str, message: str, risk: str) -> None:
        """Insert a new post record."""
        self.conn.execute(
            "INSERT INTO posts (post_id, message, risk) VALUES (?, ?, ?)",
            (post_id, message, risk)
        )
        self.conn.commit()
    
    def get_high_risk_posts(self):
        """Retrieve all high-risk posts."""
        cursor = self.conn.execute(
            "SELECT * FROM posts WHERE risk = 'high' ORDER BY checked_at DESC"
        )
        return cursor.fetchall()

# Usage:
from src.config_loader import load_config
from src.post_checker import PostChecker
from database_logger import DatabaseLogger

config = load_config("config/config.json")

checker = PostChecker(
    fb_token=config.facebook_token,
    page_id=config.facebook_page_id,
    line_token=config.line_token,
    gs_creds_file=config.google_credentials_file,
    gs_sheet_id=config.google_sheet_id,
    banned_keywords=config.banned_keywords,
)

# Add database logging
db_logger = DatabaseLogger()
original_logger = checker.logger

class DualLogger:
    """Log to both Google Sheets and database."""
    def log(self, post_id, message, risk):
        original_logger.log(post_id, message, risk)
        db_logger.log(post_id, message, risk)

checker.logger = DualLogger()
checker.run(limit=10)
```

## Example 5: Advanced Policy Detection with Regex

Use regular expressions for more sophisticated pattern matching:

```python
# advanced_detector.py
import re
from typing import Tuple, List

class AdvancedPolicyDetector:
    """Advanced policy detector with regex support."""
    
    def __init__(self):
        # Define patterns as regex
        self.patterns = {
            'phone_number': r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',
            'email': r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
            'url': r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',
            'credit_card': r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b',
        }
    
    def detect(self, text: str) -> Tuple[bool, str]:
        """Detect policy violations using regex patterns."""
        violations = []
        
        for pattern_name, pattern in self.patterns.items():
            if re.search(pattern, text):
                violations.append(pattern_name)
        
        if violations:
            reason = f"Found sensitive data: {', '.join(violations)}"
            return True, reason
        
        return False, ""

# Usage:
from src.config_loader import load_config
from src.post_checker import PostChecker
from advanced_detector import AdvancedPolicyDetector

config = load_config("config/config.json")

checker = PostChecker(
    fb_token=config.facebook_token,
    page_id=config.facebook_page_id,
    line_token=config.line_token,
    gs_creds_file=config.google_credentials_file,
    gs_sheet_id=config.google_sheet_id,
    banned_keywords=config.banned_keywords,
)

# Replace with advanced detector
checker.detector = AdvancedPolicyDetector()
checker.run(limit=10)
```

## Example 6: Web Dashboard with Flask

Create a simple web interface to view results:

```python
# web_dashboard.py
from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

@app.route('/')
def dashboard():
    """Show dashboard with recent posts."""
    conn = sqlite3.connect('posts.db')
    cursor = conn.execute(
        "SELECT * FROM posts ORDER BY checked_at DESC LIMIT 50"
    )
    posts = cursor.fetchall()
    conn.close()
    
    return render_template('dashboard.html', posts=posts)

@app.route('/high-risk')
def high_risk():
    """Show only high-risk posts."""
    conn = sqlite3.connect('posts.db')
    cursor = conn.execute(
        "SELECT * FROM posts WHERE risk = 'high' ORDER BY checked_at DESC"
    )
    posts = cursor.fetchall()
    conn.close()
    
    return render_template('high_risk.html', posts=posts)

if __name__ == '__main__':
    app.run(debug=True)
```

---

These examples demonstrate the flexibility and extensibility of the Ai-FBPostchecker888 system. Feel free to adapt these examples to your specific needs!
