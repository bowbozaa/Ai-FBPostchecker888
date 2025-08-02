"""Utilities for logging data to Google Sheets."""
from __future__ import annotations

from typing import List

try:
    import gspread
    from oauth2client.service_account import ServiceAccountCredentials
except Exception:  # pragma: no cover - libraries might not be installed
    gspread = None  # type: ignore
    ServiceAccountCredentials = None  # type: ignore


class GoogleSheetsLogger:
    """Append rows to a Google Sheet using a service account."""

    def __init__(self, creds_file: str, sheet_id: str) -> None:
        if gspread is None or ServiceAccountCredentials is None:
            raise ImportError("gspread and oauth2client are required but not installed")
        scope = [
            "https://spreadsheets.google.com/feeds",
            "https://www.googleapis.com/auth/drive",
        ]
        credentials = ServiceAccountCredentials.from_json_keyfile_name(creds_file, scope)
        client = gspread.authorize(credentials)
        self.sheet = client.open_by_key(sheet_id).sheet1

    def log(self, post_id: str, message: str, risk: str) -> None:
        """Append a new row to the sheet."""
        self.sheet.append_row([post_id, message, risk])
