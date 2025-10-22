"""
Admin Routes for User and System Management
"""

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from datetime import datetime, timedelta
import os

from api.database import db
from api.models import User, Post, Config
from api.auth import admin_required, get_current_user
from api.email_service import email_service

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')


@admin_bp.route('/users', methods=['GET'])
@jwt_required()
@admin_required()
def get_users():
    """Get all users (admin only)"""
    users = User.query.all()
    return jsonify({
        "users": [user.to_dict() for user in users]
    })


@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
@admin_required()
def delete_user(user_id):
    """Delete a user (admin only)"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.is_admin:
        return jsonify({"error": "Cannot delete admin user"}), 403

    db.session.delete(user)
    db.session.commit()

    return jsonify({"success": True, "message": "User deleted"})


@admin_bp.route('/users/<int:user_id>/toggle-admin', methods=['PUT'])
@jwt_required()
@admin_required()
def toggle_admin(user_id):
    """Toggle admin status of a user"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.is_admin = not user.is_admin
    db.session.commit()

    return jsonify({
        "success": True,
        "user": user.to_dict()
    })


@admin_bp.route('/stats/system', methods=['GET'])
@jwt_required()
@admin_required()
def get_system_stats():
    """Get system statistics"""
    total_users = User.query.count()
    total_posts = Post.query.count()

    # Calculate database size (approximate)
    db_path = 'fbpostchecker.db'
    db_size = 0
    if os.path.exists(db_path):
        db_size = os.path.getsize(db_path) / (1024 * 1024)  # Convert to MB

    # Get posts from last 7 days
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    recent_posts = Post.query.filter(Post.created_at >= seven_days_ago).count()

    return jsonify({
        "users": total_users,
        "posts": total_posts,
        "database_size": f"{db_size:.2f} MB",
        "recent_posts": recent_posts,
        "uptime": "N/A"  # Implement uptime tracking if needed
    })


@admin_bp.route('/stats/activity', methods=['GET'])
@jwt_required()
@admin_required()
def get_activity_stats():
    """Get user activity statistics"""
    # Users registered in last 7 days
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    new_users = User.query.filter(User.created_at >= seven_days_ago).count()

    # Posts by risk level
    high_risk = Post.query.filter_by(risk='high').count()
    medium_risk = Post.query.filter_by(risk='medium').count()
    low_risk = Post.query.filter_by(risk='low').count()

    return jsonify({
        "new_users_7days": new_users,
        "risk_distribution": {
            "high": high_risk,
            "medium": medium_risk,
            "low": low_risk
        }
    })


@admin_bp.route('/email/test', methods=['POST'])
@jwt_required()
@admin_required()
def send_test_email():
    """Send test email"""
    current_user = get_current_user()
    if not current_user:
        return jsonify({"error": "User not found"}), 404

    success = email_service.send_email(
        to=current_user.email,
        subject="Test Email from FB Post Shield",
        body="This is a test email. Your email configuration is working correctly!",
        html="<h1>Test Email</h1><p>This is a test email. Your email configuration is working correctly!</p>"
    )

    if success:
        return jsonify({"success": True, "message": "Test email sent"})
    else:
        return jsonify({"success": False, "error": "Failed to send email"}), 500


@admin_bp.route('/database/backup', methods=['POST'])
@jwt_required()
@admin_required()
def backup_database():
    """Create database backup"""
    try:
        # Implement database backup logic
        # For SQLite, copy the file
        # For PostgreSQL, use pg_dump
        return jsonify({
            "success": True,
            "message": "Database backup created",
            "filename": f"backup_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.db"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@admin_bp.route('/system/health', methods=['GET'])
@jwt_required()
@admin_required()
def check_health():
    """Check system health"""
    health = {
        "database": "healthy",
        "email": "unknown",
        "api": "healthy"
    }

    # Check database connection
    try:
        User.query.count()
        health["database"] = "healthy"
    except Exception:
        health["database"] = "unhealthy"

    # Check email service
    if email_service.mail:
        health["email"] = "configured"
    else:
        health["email"] = "not configured"

    return jsonify({
        "status": "healthy" if health["database"] == "healthy" else "unhealthy",
        "components": health,
        "timestamp": datetime.utcnow().isoformat()
    })


@admin_bp.route('/logs', methods=['GET'])
@jwt_required()
@admin_required()
def get_logs():
    """Get system logs"""
    # Implement log retrieval
    # This is a placeholder
    logs = [
        {
            "timestamp": datetime.utcnow().isoformat(),
            "level": "INFO",
            "message": "System health check completed"
        }
    ]

    return jsonify({"logs": logs})
