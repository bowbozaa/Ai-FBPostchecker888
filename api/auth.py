"""
Authentication utilities and decorators
"""

from functools import wraps
from flask import jsonify, request
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity, get_jwt
from api.models import User


def admin_required():
    """Decorator to require admin privileges"""
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            user = User.query.get(user_id)

            if not user or not user.is_admin:
                return jsonify({"error": "Admin privileges required"}), 403

            return fn(*args, **kwargs)
        return decorator
    return wrapper


def get_current_user():
    """Get current authenticated user"""
    user_id = get_jwt_identity()
    return User.query.get(user_id) if user_id else None
