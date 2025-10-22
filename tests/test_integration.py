"""
Integration tests for the complete system
"""
import pytest
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.policy_detector import PolicyDetector, RiskClassifier


class TestIntegration:
    """Integration tests"""

    def setup_method(self):
        """Setup test fixtures"""
        self.detector = PolicyDetector(["sale", "urgent", "alert"])
        self.classifier = RiskClassifier()

    def test_complete_workflow(self):
        """Test complete detection and classification workflow"""
        test_posts = [
            {
                "message": "Urgent sale alert! Act now!",
                "expected_flagged": True,
                "expected_risk": "high",
            },
            {
                "message": "Limited offer on products",
                "expected_flagged": False,
                "expected_risk": "medium",
            },
            {
                "message": "Hello everyone, have a nice day!",
                "expected_flagged": False,
                "expected_risk": "low",
            },
        ]

        for post in test_posts:
            # Detect policy violations
            flagged, keywords = self.detector.detect(post["message"])
            assert flagged == post["expected_flagged"]

            # Classify risk
            risk = self.classifier.classify(post["message"])
            assert risk == post["expected_risk"]

    def test_various_post_types(self):
        """Test detection across various post types"""
        posts = {
            "text_only": "This is a sale announcement",
            "with_emojis": "🔥 Hot sale today! 🔥",
            "multiline": "Line 1\nUrgent: Line 2\nLine 3",
            "mixed_case": "URGENT Sale ALERT",
        }

        for post_type, content in posts.items():
            flagged, keywords = self.detector.detect(content)
            # All should be flagged as they contain keywords
            assert flagged is True, f"Failed for {post_type}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
