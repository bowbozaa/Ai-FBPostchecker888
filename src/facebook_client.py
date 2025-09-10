"""Facebook API client module."""
from __future__ import annotations

from typing import List, Dict, Any

try:
    from facebook import GraphAPI
except Exception:  # pragma: no cover - library might not be installed during tests
    GraphAPI = None  # type: ignore


class FacebookClient:
    """Small wrapper around the Facebook Graph API.

    Parameters
    ----------
    access_token:
        Token with the required permissions to read posts from a page.
    version:
        API version to use. Defaults to ``3.1`` which is widely available.
    """

    def __init__(self, access_token: str, version: str = "3.1") -> None:
        if GraphAPI is None:
            raise ImportError("facebook-sdk library is required but not installed")
        self.graph = GraphAPI(access_token=access_token, version=version)

    def get_page_posts(self, page_id: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Return recent posts from the specified page."""
        data = self.graph.get_connections(page_id, "posts", limit=limit)
        return data.get("data", [])
