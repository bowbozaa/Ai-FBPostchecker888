import gspread
from oauth2client.service_account import ServiceAccountCredentials
import requests
import json
from datetime import datetime

class PostChecker:
    def __init__(self, fb_token, page_id, line_token, gs_creds_file, gs_sheet_id, banned_keywords):
        """
        Initialize the PostChecker with necessary tokens and configurations.
        """
        self.fb_token = fb_token
        self.page_id = page_id
        self.line_token = line_token
        self.gs_creds_file = gs_creds_file
        self.gs_sheet_id = gs_sheet_id
        self.banned_keywords = banned_keywords
        self.gs_client = None
        print("PostChecker initialized.")

    def _connect_google_sheets(self):
        """
        Connect to Google Sheets using service account credentials.
        """
        try:
            if self.gs_client is None:
                scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
                creds = ServiceAccountCredentials.from_json_keyfile_name(self.gs_creds_file, scope)
                self.gs_client = gspread.authorize(creds)
                print("Successfully connected to Google Sheets.")
        except Exception as e:
            print(f"Error connecting to Google Sheets: {e}")
            self.gs_client = None

    def _log_to_sheet(self, data):
        """
        Log data to the specified Google Sheet.
        """
        if self.gs_client is None:
            print("Cannot log to sheet, Google Sheets client is not connected.")
            return
        try:
            sheet = self.gs_client.open_by_key(self.gs_sheet_id).sheet1
            # Assuming data is a list of values for a new row
            sheet.append_row(data)
            print(f"Successfully logged data to sheet: {data}")
        except Exception as e:
            print(f"Error logging to Google Sheet: {e}")

    def _send_line_notification(self, message):
        """
        Send a notification message via LINE Notify.
        """
        url = "https://notify-api.line.me/api/notify"
        headers = {
            "Authorization": f"Bearer {self.line_token}"
        }
        payload = {
            "message": message
        }
        try:
            response = requests.post(url, headers=headers, data=payload)
            response.raise_for_status()
            print(f"Successfully sent LINE notification.")
        except Exception as e:
            print(f"Error sending LINE notification: {e}")

    def run(self, limit=10):
        """
        Main method to run the check process.
        """
        print(f"Running PostChecker, limit={limit} posts.")
        
        # 1. Connect to Google Sheets
        self._connect_google_sheets()

        # 2. Placeholder for fetching Facebook posts
        print("Fetching Facebook posts (placeholder)...")
        # In a real implementation, you would use the Facebook Graph API here
        # For now, let's simulate finding a risky post
        
        simulated_post_message = "This is a test post with a banned keyword."
        found_risky = any(keyword in simulated_post_message for keyword in self.banned_keywords)

        if found_risky:
            print("Found a risky post.")
            # 3. Placeholder for OpenAI analysis
            risk_level = "High" # Simulated analysis
            print(f"OpenAI analysis result (simulated): Risk Level {risk_level}")

            # 4. Send LINE notification
            notification_message = f"ตรวจพบโพสต์เสี่ยง!\nเนื้อหา: {simulated_post_message}\nระดับความเสี่ยง: {risk_level}"
            self._send_line_notification(notification_message)

            # 5. Log to Google Sheets
            # [Timestamp, Post Content, Risk Level, Status]
            log_data = [datetime.now().isoformat(), simulated_post_message, risk_level, "Notified"]
            self._log_to_sheet(log_data)
        else:
            print("No risky posts found in simulation.")

        print("PostChecker run finished.")
