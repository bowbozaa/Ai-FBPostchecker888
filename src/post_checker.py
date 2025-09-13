"""High level orchestration for the Facebook post checker."""
from __future__ import annotations

from typing import Iterable

from .facebook_client import FacebookClient
from .policy_detector import PolicyDetector
from .line_notifier import LineNotifier
from .google_sheets_logger import GoogleSheetsLogger

# กำหนดเกณฑ์ Risk Score สำหรับการแจ้งเตือน
HIGH_RISK_THRESHOLD = 4

class PostChecker:
    """Check Facebook posts against policies and perform side effects."""

    def __init__(
        self,
        fb_token: str,
        page_id: str,
        line_token: str,
        gs_creds_file: str,
        gs_sheet_id: str,
        # Banned keywords ไม่ถูกใช้แล้ว เพราะเราอ่านจากไฟล์โดยตรง
        banned_keywords: Iterable[str] | None = None, 
    ) -> None:
        self.page_id = page_id
        self.fb = FacebookClient(fb_token)
        # PolicyDetector จะโหลดกฎจากไฟล์ config/rules.config.json โดยอัตโนมัติ
        self.detector = PolicyDetector()
        self.notifier = LineNotifier(line_token)
        self.logger = GoogleSheetsLogger(gs_creds_file, gs_sheet_id)

    def run(self, limit: int = 10) -> None:
        """Fetch recent posts and handle policy checks."""
        posts = self.fb.get_page_posts(self.page_id, limit=limit)
        for post in posts:
            message = post.get("message", "")
            if not message:
                continue

            # ใช้ detector ตัวใหม่เพื่อค้นหากฎที่ตรงกันทั้งหมด
            matched_rules = self.detector.detect(message)

            highest_risk_score = 0
            top_rule_category = "Unknown"
            
            if matched_rules:
                # หา risk score ที่สูงที่สุดจากกฎที่ตรวจพบ
                highest_risk_score = max(rule.get("risk_score", 0) for rule in matched_rules)
                # หา category ของกฎที่มี score สูงสุด
                top_rule = max(matched_rules, key=lambda r: r.get("risk_score", 0))
                top_rule_category = top_rule.get("category", "Unknown")

            # ตัดสินใจว่าจะแจ้งเตือนหรือไม่ โดยใช้เกณฑ์ HIGH_RISK_THRESHOLD
            if highest_risk_score >= HIGH_RISK_THRESHOLD:
                keywords_found = ", ".join([r.get("keyword", "") for r in matched_rules])
                reason = f"Risk Score: {highest_risk_score}/5 (Category: {top_rule_category}) - Keywords: {keywords_found}"
                note = f"Post {post['id']} flagged: {reason}"
                self.notifier.send(note)
            
            # บันทึกลง Google Sheets (ส่ง risk score ไปด้วย)
            self.logger.log(post["id"], message, str(highest_risk_score))