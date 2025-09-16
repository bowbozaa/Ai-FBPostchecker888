"""High level orchestration for the Facebook post checker."""
from __future__ import annotations

from typing import Iterable

# Import Config class to use as a type hint
from .config_loader import Config
from .facebook_client import FacebookClient
from .policy_detector import PolicyDetector
from .line_notifier import LineNotifier
from .google_sheets_logger import GoogleSheetsLogger

# กำหนดเกณฑ์ Risk Score สำหรับการแจ้งเตือน
HIGH_RISK_THRESHOLD = 4

class PostChecker:
    """Check Facebook posts against policies and perform side effects."""

    def __init__(self, config: Config) -> None:
        """Initialize the checker with a configuration object."""
        self.page_id = config.facebook_page_id
        self.fb = FacebookClient(config.facebook_token)
        # PolicyDetector will automatically load rules from config/rules.config.json
        self.detector = PolicyDetector()
        self.notifier = LineNotifier(config.line_token)
        self.logger = GoogleSheetsLogger(
            service_account_email=config.google_service_account_email,
            sheet_id=config.google_sheet_id,
        )

    def run(self, limit: int = 10) -> None:
        """Fetch recent posts and handle policy checks."""
        posts = self.fb.get_page_posts(self.page_id, limit=limit)
        for post in posts:
            message = post.get("message", "")
            if not message:
                continue

            # Use the new detector to find all matching rules
            matched_rules = self.detector.detect(message)

            highest_risk_score = 0
            top_rule_category = "Unknown"
            
            if matched_rules:
                # Find the highest risk score from the detected rules
                highest_risk_score = max(rule.get("risk_score", 0) for rule in matched_rules)
                # Find the category of the rule with the highest score
                top_rule = max(matched_rules, key=lambda r: r.get("risk_score", 0))
                top_rule_category = top_rule.get("category", "Unknown")

            # Decide whether to send a notification using the HIGH_RISK_THRESHOLD
            if highest_risk_score >= HIGH_RISK_THRESHOLD:
                keywords_found = ", ".join([r.get("keyword", "") for r in matched_rules])
                reason = f"Risk Score: {highest_risk_score}/5 (Category: {top_rule_category}) - Keywords: {keywords_found}"
                note = f"Post {post['id']} flagged: {reason}"
                self.notifier.send(note)
            
            # Log to Google Sheets (including the risk score)
            self.logger.log(post["id"], message, str(highest_risk_score))
