"""
Flask REST API Server with Database & Authentication
"""

import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from datetime import timedelta, datetime
from dotenv import load_dotenv

from api.database import db, init_db
from api.models import User, Post, Config, get_config, set_config, init_default_config
from api.auth import admin_required, get_current_user

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

# Initialize JWT
jwt = JWTManager(app)

# Initialize database
init_db(app)

# Create default admin user if not exists
with app.app_context():
    init_default_config()
    if not User.query.filter_by(username='admin').first():
        admin = User(
            username='admin',
            email='admin@fbpostchecker.com',
            is_admin=True
        )
        admin.set_password('admin123')  # Change this in production!
        db.session.add(admin)
        db.session.commit()
        print("✅ Default admin user created (username: admin, password: admin123)")


# ==================== Auth Endpoints ====================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register new user"""
    data = request.json

    if not data or not all(k in data for k in ['username', 'email', 'password']):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if user exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    # Create new user
    user = User(
        username=data['username'],
        email=data['email']
    )
    user.set_password(data['password'])

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "User registered successfully",
        "user": user.to_dict()
    }), 201


@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    data = request.json

    if not data or not all(k in data for k in ['username', 'password']):
        return jsonify({"error": "Missing username or password"}), 400

    user = User.query.filter_by(username=data['username']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Invalid username or password"}), 401

    # Create access token
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "success": True,
        "access_token": access_token,
        "user": user.to_dict()
    })


@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_me():
    """Get current user info"""
    user = get_current_user()
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict())


# ==================== Post Endpoints ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "timestamp": datetime.utcnow().isoformat()})


@app.route('/api/stats', methods=['GET'])
@jwt_required()
def get_stats():
    """Get statistics about checked posts"""
    total = Post.query.count()
    high = Post.query.filter_by(risk='high').count()
    medium = Post.query.filter_by(risk='medium').count()
    low = Post.query.filter_by(risk='low').count()

    # Posts checked today
    today = datetime.utcnow().date()
    today_start = datetime.combine(today, datetime.min.time())
    today_count = Post.query.filter(Post.created_at >= today_start).count()

    return jsonify({
        "total": total,
        "high": high,
        "medium": medium,
        "low": low,
        "today": today_count
    })


@app.route('/api/posts', methods=['GET'])
@jwt_required()
def get_posts():
    """Get all checked posts with optional filters"""
    risk_filter = request.args.get('risk')
    search = request.args.get('search', '').lower()
    limit = int(request.args.get('limit', 50))

    # Build query
    query = Post.query

    # Apply risk filter
    if risk_filter and risk_filter != 'all':
        query = query.filter_by(risk=risk_filter)

    # Apply search filter
    if search:
        query = query.filter(Post.message.ilike(f'%{search}%'))

    # Order by timestamp descending
    query = query.order_by(Post.timestamp.desc())

    # Get total before limit
    total = query.count()

    # Apply limit
    posts = query.limit(limit).all()

    return jsonify({
        "posts": [post.to_dict() for post in posts],
        "total": total,
        "filtered": len(posts)
    })


@app.route('/api/posts/<fb_post_id>', methods=['GET'])
@jwt_required()
def get_post(fb_post_id):
    """Get a specific post by Facebook ID"""
    post = Post.query.filter_by(fb_post_id=fb_post_id).first()
    if not post:
        return jsonify({"error": "Post not found"}), 404

    return jsonify(post.to_dict())


@app.route('/api/posts', methods=['POST'])
@jwt_required()
def add_post():
    """Add a new checked post"""
    data = request.json

    # Validate required fields
    required_fields = ['id', 'message', 'risk', 'timestamp']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if post already exists
    existing_post = Post.query.filter_by(fb_post_id=data['id']).first()
    if existing_post:
        return jsonify({"error": "Post already exists"}), 400

    # Create new post
    post = Post(
        fb_post_id=data['id'],
        message=data['message'],
        risk=data['risk'],
        keywords=data.get('keywords', []),
        timestamp=datetime.fromisoformat(data['timestamp'].replace('Z', '+00:00')),
        from_page=data.get('from', 'Unknown'),
        post_type=data.get('type', 'status')
    )

    db.session.add(post)
    db.session.commit()

    return jsonify({
        "success": True,
        "post": post.to_dict()
    }), 201


@app.route('/api/alerts/recent', methods=['GET'])
@jwt_required()
def get_recent_alerts():
    """Get recent high/medium risk alerts"""
    limit = int(request.args.get('limit', 10))

    # Filter for high and medium risk only
    alerts = Post.query.filter(Post.risk.in_(['high', 'medium']))\
                       .order_by(Post.timestamp.desc())\
                       .limit(limit)\
                       .all()

    return jsonify({
        "alerts": [alert.to_dict() for alert in alerts],
        "total": len(alerts)
    })


# ==================== Config Endpoints ====================

@app.route('/api/config', methods=['GET'])
@jwt_required()
def get_configuration():
    """Get current configuration"""
    return jsonify({
        "bannedKeywords": get_config('banned_keywords', []),
        "highRiskTerms": get_config('high_risk_terms', []),
        "pageId": get_config('page_id', ''),
        "checkInterval": get_config('check_interval', 30)
    })


@app.route('/api/config', methods=['PUT'])
@jwt_required()
@admin_required()
def update_configuration():
    """Update configuration (admin only)"""
    data = request.json

    # Update config
    if 'bannedKeywords' in data:
        set_config('banned_keywords', data['bannedKeywords'])
    if 'highRiskTerms' in data:
        set_config('high_risk_terms', data['highRiskTerms'])
    if 'pageId' in data:
        set_config('page_id', data['pageId'])
    if 'checkInterval' in data:
        set_config('check_interval', data['checkInterval'])

    return jsonify({
        "success": True,
        "config": {
            "bannedKeywords": get_config('banned_keywords', []),
            "highRiskTerms": get_config('high_risk_terms', []),
            "pageId": get_config('page_id', ''),
            "checkInterval": get_config('check_interval', 30)
        }
    })


@app.route('/api/check/trigger', methods=['POST'])
@jwt_required()
@admin_required()
def trigger_check():
    """Manually trigger a post check (admin only)"""
    # TODO: Implement manual trigger of post checker
    return jsonify({
        "success": True,
        "message": "Post check triggered"
    })


# ==================== Error Handlers ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"error": "Token has expired"}), 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"error": "Invalid token"}), 401


@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({"error": "Authorization token is missing"}), 401


# ==================== Main ====================

if __name__ == '__main__':
    print("🚀 Starting FB Post Shield API Server with Database & Auth...")
    print("🔐 Default admin credentials: username=admin, password=admin123")
    print("🌐 Server running on http://0.0.0.0:5000")

    app.run(debug=True, host='0.0.0.0', port=5000)
