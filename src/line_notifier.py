"""Simple LINE Notify client."""
from __future__ import annotations

import requests


class LineNotifier:
    """Send push notifications using the LINE Notify API."""

    def __init__(self, token: str) -> None:
        self._token = token

    def send(self, message: str) -> None:
        response = requests.post(
            "https://notify-api.line.me/api/notify",
            headers={"Authorization": f"Bearer {self._token}"},
            data={"message": message},
            timeout=10,
        )
        response.raise_for_status()
