"""
Email Notification Service
"""

import os
from flask import Flask
from flask_mail import Mail, Message
from datetime import datetime
from typing import List, Optional


class EmailService:
    """Email notification service"""

    def __init__(self, app: Optional[Flask] = None):
        self.mail = None
        if app:
            self.init_app(app)

    def init_app(self, app: Flask):
        """Initialize email service with Flask app"""
        # Email configuration
        app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
        app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
        app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'True') == 'True'
        app.config['MAIL_USE_SSL'] = os.environ.get('MAIL_USE_SSL', 'False') == 'True'
        app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
        app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
        app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER', 'noreply@fbpostshield.com')

        self.mail = Mail(app)

    def send_email(self, to: str, subject: str, body: str, html: Optional[str] = None):
        """Send email"""
        if not self.mail:
            print("⚠️ Email service not initialized")
            return False

        try:
            msg = Message(
                subject=subject,
                recipients=[to] if isinstance(to, str) else to,
                body=body,
                html=html
            )
            self.mail.send(msg)
            print(f"✅ Email sent to {to}")
            return True
        except Exception as e:
            print(f"❌ Failed to send email: {e}")
            return False

    def send_welcome_email(self, user_email: str, username: str):
        """Send welcome email to new user"""
        subject = "Welcome to FB Post Shield! 🛡️"
        body = f"""
Hello {username}!

Welcome to FB Post Shield - AI Facebook Post Checker!

Your account has been successfully created. You can now:
✅ Monitor Facebook posts in real-time
✅ Detect policy violations automatically
✅ Manage risk levels and keywords
✅ View analytics and statistics

Get started by logging in at: [Your Dashboard URL]

Best regards,
FB Post Shield Team
        """

        html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
        .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }}
        .button {{ background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }}
        .feature {{ background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #2563eb; border-radius: 4px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛡️ Welcome to FB Post Shield!</h1>
        </div>
        <div class="content">
            <h2>Hello {username}!</h2>
            <p>Your account has been successfully created. You're now ready to start monitoring your Facebook posts with AI-powered protection.</p>

            <h3>What you can do:</h3>
            <div class="feature">✅ Monitor Facebook posts in real-time</div>
            <div class="feature">✅ Detect policy violations automatically</div>
            <div class="feature">✅ Manage risk levels and keywords</div>
            <div class="feature">✅ View analytics and statistics</div>

            <a href="#" class="button">Go to Dashboard</a>

            <p>If you have any questions, feel free to contact our support team.</p>

            <p>Best regards,<br>FB Post Shield Team</p>
        </div>
    </div>
</body>
</html>
        """

        return self.send_email(user_email, subject, body, html)

    def send_high_risk_alert(self, admin_emails: List[str], post_data: dict):
        """Send high risk post alert to admins"""
        subject = "⚠️ High Risk Post Detected!"
        body = f"""
High Risk Post Alert!

Post ID: {post_data.get('id', 'Unknown')}
Risk Level: {post_data.get('risk', 'Unknown')}
Flagged Keywords: {', '.join(post_data.get('keywords', []))}
Timestamp: {post_data.get('timestamp', 'Unknown')}

Message Preview:
{post_data.get('message', '')[:200]}...

Please review this post in your dashboard immediately.

---
FB Post Shield Automated Alert
        """

        html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
        .content {{ background: #fef2f2; padding: 30px; border-radius: 0 0 8px 8px; }}
        .alert-box {{ background: white; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; border-radius: 4px; }}
        .keyword {{ background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 4px; display: inline-block; margin: 2px; }}
        .button {{ background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚠️ High Risk Post Detected!</h1>
        </div>
        <div class="content">
            <div class="alert-box">
                <h3>Alert Details</h3>
                <p><strong>Post ID:</strong> {post_data.get('id', 'Unknown')}</p>
                <p><strong>Risk Level:</strong> <span style="color: #dc2626; font-weight: bold;">HIGH</span></p>
                <p><strong>Timestamp:</strong> {post_data.get('timestamp', 'Unknown')}</p>

                <h4>Flagged Keywords:</h4>
                <div>
                    {''.join([f'<span class="keyword">{kw}</span>' for kw in post_data.get('keywords', [])])}
                </div>

                <h4>Message Preview:</h4>
                <p style="background: #f3f4f6; padding: 15px; border-radius: 4px; font-style: italic;">
                    {post_data.get('message', '')[:200]}...
                </p>
            </div>

            <a href="#" class="button">Review in Dashboard</a>

            <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
                This is an automated alert from FB Post Shield. Please review the post immediately.
            </p>
        </div>
    </div>
</body>
</html>
        """

        success_count = 0
        for email in admin_emails:
            if self.send_email(email, subject, body, html):
                success_count += 1

        return success_count

    def send_weekly_report(self, admin_email: str, stats: dict):
        """Send weekly statistics report"""
        subject = "📊 FB Post Shield - Weekly Report"
        body = f"""
Weekly Report - FB Post Shield

Statistics for the past week:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Posts Checked: {stats.get('total', 0)}
High Risk Posts: {stats.get('high', 0)}
Medium Risk Posts: {stats.get('medium', 0)}
Low Risk Posts: {stats.get('low', 0)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Top Flagged Keywords:
{chr(10).join([f'- {kw}' for kw in stats.get('top_keywords', [])])}

View full report in your dashboard.

Best regards,
FB Post Shield Team
        """

        html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
        .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }}
        .stat-box {{ background: white; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
        .stat-row {{ display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }}
        .stat-label {{ font-weight: 500; color: #6b7280; }}
        .stat-value {{ font-weight: bold; font-size: 18px; }}
        .high {{ color: #dc2626; }}
        .medium {{ color: #f59e0b; }}
        .low {{ color: #059669; }}
        .button {{ background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Weekly Report</h1>
            <p>Your FB Post Shield Summary</p>
        </div>
        <div class="content">
            <div class="stat-box">
                <h3>Statistics</h3>
                <div class="stat-row">
                    <span class="stat-label">Total Posts Checked</span>
                    <span class="stat-value">{stats.get('total', 0)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">High Risk Posts</span>
                    <span class="stat-value high">{stats.get('high', 0)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Medium Risk Posts</span>
                    <span class="stat-value medium">{stats.get('medium', 0)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Low Risk Posts</span>
                    <span class="stat-value low">{stats.get('low', 0)}</span>
                </div>
            </div>

            <div class="stat-box">
                <h3>Top Flagged Keywords</h3>
                <ul>
                    {''.join([f'<li>{kw}</li>' for kw in stats.get('top_keywords', [])])}
                </ul>
            </div>

            <a href="#" class="button">View Full Report</a>
        </div>
    </div>
</body>
</html>
        """

        return self.send_email(admin_email, subject, body, html)


# Initialize email service
email_service = EmailService()
