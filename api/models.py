"""
Database Models
"""

from datetime import datetime
from api.database import db
from flask_bcrypt import generate_password_hash, check_password_hash


class User(db.Model):
    """User model for authentication"""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    is_admin = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """Check if password matches hash"""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'is_admin': self.is_admin
        }

    def __repr__(self):
        return f'<User {self.username}>'


class Post(db.Model):
    """Post model for storing checked Facebook posts"""
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    fb_post_id = db.Column(db.String(100), unique=True, nullable=False, index=True)
    message = db.Column(db.Text, nullable=False)
    risk = db.Column(db.String(20), nullable=False, index=True)  # low, medium, high
    keywords = db.Column(db.JSON)  # List of flagged keywords
    timestamp = db.Column(db.DateTime, nullable=False, index=True)
    from_page = db.Column(db.String(100))
    post_type = db.Column(db.String(50))  # status, link, photo, video
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.fb_post_id,
            'message': self.message,
            'risk': self.risk,
            'keywords': self.keywords or [],
            'timestamp': self.timestamp.isoformat(),
            'from': self.from_page,
            'type': self.post_type
        }

    def __repr__(self):
        return f'<Post {self.fb_post_id} - {self.risk}>'


class Config(db.Model):
    """Configuration model for storing app settings"""
    __tablename__ = 'config'

    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False, index=True)
    value = db.Column(db.JSON, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Convert to dictionary"""
        return {
            'key': self.key,
            'value': self.value,
            'updated_at': self.updated_at.isoformat()
        }

    def __repr__(self):
        return f'<Config {self.key}>'


# Helper functions for config
def get_config(key, default=None):
    """Get configuration value by key"""
    config = Config.query.filter_by(key=key).first()
    return config.value if config else default


def set_config(key, value):
    """Set configuration value"""
    config = Config.query.filter_by(key=key).first()
    if config:
        config.value = value
        config.updated_at = datetime.utcnow()
    else:
        config = Config(key=key, value=value)
        db.session.add(config)
    db.session.commit()
    return config


def init_default_config():
    """Initialize default configuration"""
    defaults = {
        'banned_keywords': ['sale', 'limited', 'offer', 'urgent', 'free'],
        'high_risk_terms': ['alert', 'warning', 'urgent', 'act now'],
        'page_id': 'your-page-id',
        'check_interval': 30
    }

    for key, value in defaults.items():
        if not Config.query.filter_by(key=key).first():
            config = Config(key=key, value=value)
            db.session.add(config)

    db.session.commit()
    print("✅ Default configuration initialized")
