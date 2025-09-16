"""Configuration utilities for the post checker."""
from __future__ import annotations

import json
from dataclasses import dataclass
from typing import List


@dataclass
class Config:
    facebook_token: str
    facebook_page_id: str
    line_token: str
    google_service_account_email: str
    google_sheet_id: str
    banned_keywords: List[str]


def load_config(path: str) -> Config:
    """Load configuration from ``path`` and return a :class:`Config` instance."""
    with open(path, "r", encoding="utf8") as fh:
        data = json.load(fh)
    return Config(
        facebook_token=data["facebook"]["access_token"],
        facebook_page_id=data["facebook"]["page_id"],
        line_token=data["line"]["token"],
        google_service_account_email=data["google_sheets"]["service_account_email"],
        google_sheet_id=data["google_sheets"]["sheet_id"],
        banned_keywords=data.get("policy", {}).get("banned_keywords", []),
    )
