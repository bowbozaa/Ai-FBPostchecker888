"""
API Tests for FB Post Shield
"""

import pytest
import json
from api.server import app
from api.database import db
from api.models import User, Post, Config


@pytest.fixture
def client():
    """Create test client"""
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            # Create test admin user
            admin = User(username='testadmin', email='test@example.com', is_admin=True)
            admin.set_password('testpass')
            db.session.add(admin)
            db.session.commit()
        yield client


def test_health_check(client):
    """Test health check endpoint"""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'healthy'


def test_register_user(client):
    """Test user registration"""
    response = client.post('/api/auth/register',
        json={
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'password123'
        }
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['success'] == True
    assert data['user']['username'] == 'newuser'


def test_login(client):
    """Test user login"""
    response = client.post('/api/auth/login',
        json={
            'username': 'testadmin',
            'password': 'testpass'
        }
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'access_token' in data
    assert data['user']['username'] == 'testadmin'


def test_login_invalid_credentials(client):
    """Test login with invalid credentials"""
    response = client.post('/api/auth/login',
        json={
            'username': 'testadmin',
            'password': 'wrongpassword'
        }
    )
    assert response.status_code == 401


def test_protected_endpoint_without_token(client):
    """Test accessing protected endpoint without token"""
    response = client.get('/api/stats')
    assert response.status_code == 401


def test_protected_endpoint_with_token(client):
    """Test accessing protected endpoint with valid token"""
    # Login first
    login_response = client.post('/api/auth/login',
        json={
            'username': 'testadmin',
            'password': 'testpass'
        }
    )
    token = json.loads(login_response.data)['access_token']

    # Access protected endpoint
    response = client.get('/api/stats',
        headers={'Authorization': f'Bearer {token}'}
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'total' in data
    assert 'high' in data
    assert 'medium' in data
    assert 'low' in data


def test_get_posts(client):
    """Test getting posts"""
    # Login first
    login_response = client.post('/api/auth/login',
        json={
            'username': 'testadmin',
            'password': 'testpass'
        }
    )
    token = json.loads(login_response.data)['access_token']

    # Get posts
    response = client.get('/api/posts',
        headers={'Authorization': f'Bearer {token}'}
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'posts' in data
    assert 'total' in data


def test_add_post(client):
    """Test adding a new post"""
    # Login first
    login_response = client.post('/api/auth/login',
        json={
            'username': 'testadmin',
            'password': 'testpass'
        }
    )
    token = json.loads(login_response.data)['access_token']

    # Add post
    response = client.post('/api/posts',
        headers={'Authorization': f'Bearer {token}'},
        json={
            'id': 'test123',
            'message': 'Test post message',
            'risk': 'low',
            'keywords': [],
            'timestamp': '2024-01-01T00:00:00',
            'from': 'Test Page',
            'type': 'status'
        }
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['success'] == True
    assert data['post']['id'] == 'test123'


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
