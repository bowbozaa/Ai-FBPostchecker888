"""
Unit tests for PolicyDetector and RiskClassifier
"""
import pytest
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.policy_detector import PolicyDetector, RiskClassifier


class TestPolicyDetector:
    """Test cases for PolicyDetector"""

    def setup_method(self):
        """Setup test fixtures"""
        self.keywords = ["sale", "alert", "urgent", "ban"]
        self.detector = PolicyDetector(self.keywords)

    def test_detect_exact_match(self):
        """Test exact keyword match"""
        flagged, keywords = self.detector.detect("Big sale today!")
        assert flagged is True
        assert "sale" in keywords

    def test_detect_case_insensitive(self):
        """Test case insensitive detection"""
        flagged, keywords = self.detector.detect("URGENT message here")
        assert flagged is True
        assert "urgent" in keywords

    def test_detect_word_boundary(self):
        """Test word boundary matching (no substring matches)"""
        # "sale" should NOT match "wholesale"
        flagged, keywords = self.detector.detect("Wholesale products available")
        assert flagged is False
        assert "sale" not in keywords

        # "sale" should NOT match "Jerusalem"
        flagged, keywords = self.detector.detect("Jerusalem is a city")
        assert flagged is False
        assert "sale" not in keywords

    def test_detect_multiple_keywords(self):
        """Test detection of multiple keywords"""
        flagged, keywords = self.detector.detect("Urgent sale alert!")
        assert flagged is True
        assert "urgent" in keywords
        assert "sale" in keywords
        assert "alert" in keywords

    def test_detect_no_match(self):
        """Test when no keywords are found"""
        flagged, keywords = self.detector.detect("Normal post content")
        assert flagged is False
        assert keywords == ""

    def test_detect_empty_text(self):
        """Test with empty text"""
        flagged, keywords = self.detector.detect("")
        assert flagged is False
        assert keywords == ""

    def test_detect_none_text(self):
        """Test with None text"""
        flagged, keywords = self.detector.detect(None)
        assert flagged is False
        assert keywords == ""


class TestRiskClassifier:
    """Test cases for RiskClassifier"""

    def setup_method(self):
        """Setup test fixtures"""
        self.classifier = RiskClassifier()

    def test_classify_high_risk(self):
        """Test high risk classification"""
        risk = self.classifier.classify("Urgent action required now!")
        assert risk == "high"

        risk = self.classifier.classify("Alert: immediate response needed")
        assert risk == "high"

    def test_classify_medium_risk(self):
        """Test medium risk classification"""
        risk = self.classifier.classify("Limited time offer available")
        assert risk == "medium"

        risk = self.classifier.classify("Discount on products")
        assert risk == "medium"

    def test_classify_low_risk(self):
        """Test low risk classification (no risk terms)"""
        risk = self.classifier.classify("Just a normal post")
        assert risk == "low"

        risk = self.classifier.classify("Hello everyone!")
        assert risk == "low"

    def test_classify_word_boundary(self):
        """Test word boundary matching in risk classification"""
        # "urgent" should NOT match "insurgent"
        risk = self.classifier.classify("The insurgent forces")
        assert risk == "low"

        # "alert" should NOT match "alertness"
        risk = self.classifier.classify("Maintaining alertness is important")
        assert risk == "low"

    def test_classify_empty_text(self):
        """Test classification with empty text"""
        risk = self.classifier.classify("")
        assert risk == "low"

    def test_classify_none_text(self):
        """Test classification with None text"""
        risk = self.classifier.classify(None)
        assert risk == "low"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
