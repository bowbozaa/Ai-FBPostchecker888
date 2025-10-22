"""
Simple Flask API server for the Facebook Post Risk Monitor Dashboard
"""
from flask import Flask, jsonify
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from typing import List, Dict, Any
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access


class DashboardAPI:
    """API handler for dashboard data"""

    def __init__(self, config_path: str = "config/config.json"):
        """Initialize API with configuration"""
        if not os.path.exists(config_path):
            self.config = None
            self.sheet = None
            return

        with open(config_path, "r") as f:
            self.config = json.load(f)

        # Initialize Google Sheets connection
        if self.config and "google_sheets" in self.config:
            try:
                scope = [
                    "https://spreadsheets.google.com/feeds",
                    "https://www.googleapis.com/auth/drive",
                ]
                creds = ServiceAccountCredentials.from_json_keyfile_name(
                    self.config["google_sheets"]["credentials_file"], scope
                )
                client = gspread.authorize(creds)
                self.sheet = client.open_by_key(
                    self.config["google_sheets"]["sheet_id"]
                ).sheet1
            except Exception as e:
                print(f"Failed to initialize Google Sheets: {e}")
                self.sheet = None

    def get_stats(self) -> Dict[str, Any]:
        """Get statistics from Google Sheets"""
        if not self.sheet:
            return self._get_mock_stats()

        try:
            records = self.sheet.get_all_records()

            total_posts = len(records)
            flagged_posts = len([r for r in records if r.get("flagged", False)])
            high_risk = len([r for r in records if r.get("risk") == "high"])
            medium_risk = len([r for r in records if r.get("risk") == "medium"])
            low_risk = len([r for r in records if r.get("risk") == "low"])

            return {
                "totalPosts": total_posts,
                "flaggedPosts": flagged_posts,
                "highRisk": high_risk,
                "mediumRisk": medium_risk,
                "lowRisk": low_risk,
            }
        except Exception as e:
            print(f"Error fetching stats: {e}")
            return self._get_mock_stats()

    def get_recent_posts(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get recent flagged posts from Google Sheets"""
        if not self.sheet:
            return self._get_mock_posts()

        try:
            records = self.sheet.get_all_records()

            # Filter flagged posts and sort by timestamp (most recent first)
            flagged = [r for r in records if r.get("flagged", False)]
            flagged.sort(key=lambda x: x.get("created_time", ""), reverse=True)

            # Return limited results
            return [
                {
                    "id": r.get("post_id", "unknown"),
                    "message": r.get("message", ""),
                    "risk": r.get("risk", "low"),
                    "flaggedKeywords": r.get("keywords", "").split(",")
                    if r.get("keywords")
                    else [],
                    "createdTime": r.get("created_time", ""),
                }
                for r in flagged[:limit]
            ]
        except Exception as e:
            print(f"Error fetching recent posts: {e}")
            return self._get_mock_posts()

    def _get_mock_stats(self) -> Dict[str, Any]:
        """Return mock statistics for demo/testing"""
        return {
            "totalPosts": 150,
            "flaggedPosts": 12,
            "highRisk": 3,
            "mediumRisk": 5,
            "lowRisk": 4,
        }

    def _get_mock_posts(self) -> List[Dict[str, Any]]:
        """Return mock posts for demo/testing"""
        from datetime import datetime, timedelta

        now = datetime.now()
        return [
            {
                "id": "1",
                "message": "Example post with banned keyword: sale",
                "risk": "high",
                "flaggedKeywords": ["sale"],
                "createdTime": now.isoformat(),
            },
            {
                "id": "2",
                "message": "Another post with urgent content",
                "risk": "medium",
                "flaggedKeywords": ["urgent"],
                "createdTime": (now - timedelta(hours=1)).isoformat(),
            },
            {
                "id": "3",
                "message": "Low risk post with minor flag",
                "risk": "low",
                "flaggedKeywords": [],
                "createdTime": (now - timedelta(hours=2)).isoformat(),
            },
        ]


# Initialize API handler
api_handler = DashboardAPI()


@app.route("/api/stats", methods=["GET"])
def get_stats():
    """Get dashboard statistics"""
    return jsonify(api_handler.get_stats())


@app.route("/api/recent-posts", methods=["GET"])
def get_recent_posts():
    """Get recent flagged posts"""
    return jsonify(api_handler.get_recent_posts())


@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "service": "Facebook Post Risk Monitor API"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
