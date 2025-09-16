"""Utilities for logging data to Google Sheets."""
from __future__ import annotations

from typing import List

try:
    import gspread
    import google.auth
    from google.auth.impersonated_credentials import Credentials as ImpersonatedCredentials
except ImportError:  # pragma: no cover - libraries might not be ininstalled
    gspread = None  # type: ignore
    google = None  # type: ignore
    ImpersonatedCredentials = None  # type: ignore


class GoogleSheetsLogger:
    """Append rows to a Google Sheet using an impersonated service account."""

    def __init__(self, service_account_email: str, sheet_id: str) -> None:
        if gspread is None or google is None or ImpersonatedCredentials is None:
            raise ImportError(
                "gspread and google-auth are required but not installed"
            )
        
        # Define the required scopes
        scope = [
            "https://spreadsheets.google.com/feeds",
            "https://www.googleapis.com/auth/drive",
        ]

        # Get the default credentials from the environment (e.g., Cloud Shell)
        source_credentials, _ = google.auth.default(scopes=scope)

        # Create impersonated credentials
        credentials = ImpersonatedCredentials(
            source_credentials=source_credentials,
            target_principal=service_account_email,
            target_scopes=scope,
        )

        # Authorize gspread with the impersonated credentials
        client = gspread.authorize(credentials)
        self.sheet = client.open_by_key(sheet_id).sheet1

    def log(self, post_id: str, message: str, risk: str) -> None:
        """Append a new row to the sheet."""
        self.sheet.append_row([post_id, message, risk])