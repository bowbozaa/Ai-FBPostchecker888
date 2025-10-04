"""High level orchestration for the Facebook post checker."""
from __future__ import annotations

from typing import Iterable

from .facebook_client import FacebookClient
from .policy_detector import PolicyDetector, RiskClassifier
from .line_notifier import LineNotifier
from .google_sheets_logger import GoogleSheetsLogger


class PostChecker:
    """Check Facebook posts against policies and perform side effects."""

    def __init__(
        self,
        fb_token: str,
        page_id: str,
        line_token: str,
        gs_creds_file: str,
        gs_sheet_id: str,
        banned_keywords: Iterable[str] | None = None,
    ) -> None:
        self.page_id = page_id
        self.fb = FacebookClient(fb_token)
        self.detector = PolicyDetector(banned_keywords)
        self.classifier = RiskClassifier()
        self.notifier = LineNotifier(line_token)
        self.logger = GoogleSheetsLogger(gs_creds_file, gs_sheet_id)

    def run(self, limit: int = 10) -> None:
        """Fetch recent posts and handle policy checks."""
        posts = self.fb.get_page_posts(self.page_id, limit=limit)
        for post in posts:
            # Extract text content from various post fields
            # Different post types use different fields:
            # - Regular posts: "message"
            # - Photo/video posts: "message" or "description" or "caption"
            # - Shared posts: "story"
            # - Link posts: "message", "name", "description"
            text_parts = []
            for field in ["message", "story", "description", "caption", "name"]:
                if field in post and post[field]:
                    text_parts.append(post[field])
            
            message = " ".join(text_parts)
            
            # Skip posts with no text content
            if not message.strip():
                continue
            
            # Get post ID with fallback
            post_id = post.get("id", "unknown")
            
            violation, reason = self.detector.detect(message)
            risk = self.classifier.classify(message)

            if violation or risk == "high":
                note = f"Post {post_id} flagged: {reason} (risk={risk})"
                self.notifier.send(note)
            self.logger.log(post_id, message, risk)
