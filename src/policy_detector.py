"""Policy detection and risk classification helpers."""
from __future__ import annotations

from typing import Iterable, Tuple, List


class PolicyDetector:
    """Detects whether a post violates configured policies.

    The detector performs a very small rule based check on whether any of the
    banned keywords appear in the text of a post.
    """

    def __init__(self, banned_keywords: Iterable[str] | None = None) -> None:
        self._keywords = set(k.lower() for k in banned_keywords or [])

    def detect(self, text: str) -> Tuple[bool, str]:
        """Return a tuple ``(violation, reason)`` for the supplied text."""
        lowered = text.lower()
        offending: List[str] = [k for k in self._keywords if k in lowered]
        if offending:
            reason = f"Found banned keywords: {', '.join(offending)}"
            return True, reason
        return False, ""


class RiskClassifier:
    """Classify the risk level of a post.

    The classifier is intentionally extremely small – it merely looks for a
    handful of words associated with high risk posts.  Real deployments would
    likely use machine learning based systems.
    """

    _high_risk_terms = {"urgent", "alert", "warning"}

    def classify(self, text: str) -> str:
        lowered = text.lower()
        if any(term in lowered for term in self._high_risk_terms):
            return "high"
        return "low"
