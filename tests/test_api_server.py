"""
Unit tests for API server
"""
import pytest
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.api_server import app, DashboardAPI


@pytest.fixture
def client():
    """Create test client"""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


class TestAPIEndpoints:
    """Test API endpoints"""

    def test_health_check(self, client):
        """Test health check endpoint"""
        response = client.get("/api/health")
        assert response.status_code == 200
        data = response.get_json()
        assert data["status"] == "ok"

    def test_get_stats(self, client):
        """Test stats endpoint"""
        response = client.get("/api/stats")
        assert response.status_code == 200
        data = response.get_json()

        # Check required fields
        assert "totalPosts" in data
        assert "flaggedPosts" in data
        assert "highRisk" in data
        assert "mediumRisk" in data
        assert "lowRisk" in data

        # Check data types
        assert isinstance(data["totalPosts"], int)
        assert isinstance(data["flaggedPosts"], int)
        assert isinstance(data["highRisk"], int)

    def test_get_recent_posts(self, client):
        """Test recent posts endpoint"""
        response = client.get("/api/recent-posts")
        assert response.status_code == 200
        data = response.get_json()

        # Check it returns a list
        assert isinstance(data, list)

        # Check post structure if data exists
        if len(data) > 0:
            post = data[0]
            assert "id" in post
            assert "message" in post
            assert "risk" in post
            assert "flaggedKeywords" in post
            assert "createdTime" in post


class TestDashboardAPI:
    """Test DashboardAPI class"""

    def test_mock_stats(self):
        """Test mock stats generation"""
        api = DashboardAPI()
        stats = api._get_mock_stats()

        assert stats["totalPosts"] > 0
        assert stats["flaggedPosts"] >= 0
        assert stats["highRisk"] >= 0
        assert stats["mediumRisk"] >= 0
        assert stats["lowRisk"] >= 0

    def test_mock_posts(self):
        """Test mock posts generation"""
        api = DashboardAPI()
        posts = api._get_mock_posts()

        assert len(posts) > 0
        for post in posts:
            assert "id" in post
            assert "message" in post
            assert "risk" in post
            assert post["risk"] in ["high", "medium", "low"]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
