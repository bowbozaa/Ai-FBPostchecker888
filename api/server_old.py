"""
Flask REST API Server for Facebook Post Checker
Provides endpoints for the frontend dashboard
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
from typing import Dict, List, Any

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# In-memory data storage (replace with database in production)
posts_db = []
stats_db = {
    "total": 0,
    "high": 0,
    "medium": 0,
    "low": 0,
    "today": 0
}
config_db = {
    "bannedKeywords": ["sale", "limited", "offer", "urgent", "free"],
    "highRiskTerms": ["alert", "warning", "urgent", "act now"],
    "pageId": "your-page-id",
    "checkInterval": 30
}


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})


@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get statistics about checked posts"""
    return jsonify(stats_db)


@app.route('/api/posts', methods=['GET'])
def get_posts():
    """Get all checked posts with optional filters"""
    risk_filter = request.args.get('risk', 'all')
    search = request.args.get('search', '').lower()
    limit = int(request.args.get('limit', 50))

    filtered_posts = posts_db

    # Apply risk filter
    if risk_filter != 'all':
        filtered_posts = [p for p in filtered_posts if p['risk'] == risk_filter]

    # Apply search filter
    if search:
        filtered_posts = [p for p in filtered_posts if search in p['message'].lower()]

    # Apply limit
    filtered_posts = filtered_posts[:limit]

    return jsonify({
        "posts": filtered_posts,
        "total": len(posts_db),
        "filtered": len(filtered_posts)
    })


@app.route('/api/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    """Get a specific post by ID"""
    post = next((p for p in posts_db if p['id'] == post_id), None)
    if post:
        return jsonify(post)
    return jsonify({"error": "Post not found"}), 404


@app.route('/api/posts', methods=['POST'])
def add_post():
    """Add a new checked post (called by the checker)"""
    data = request.json

    # Validate required fields
    required_fields = ['id', 'message', 'risk', 'timestamp']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Add post to database
    post = {
        "id": data['id'],
        "message": data['message'],
        "risk": data['risk'],
        "keywords": data.get('keywords', []),
        "timestamp": data['timestamp'],
        "from": data.get('from', 'Unknown'),
        "type": data.get('type', 'status')
    }

    posts_db.insert(0, post)  # Insert at beginning for latest-first order

    # Update stats
    stats_db['total'] += 1
    stats_db[data['risk']] += 1

    # Check if today
    post_date = datetime.fromisoformat(data['timestamp'].replace('Z', '+00:00'))
    if post_date.date() == datetime.now().date():
        stats_db['today'] += 1

    return jsonify({"success": True, "post": post}), 201


@app.route('/api/alerts/recent', methods=['GET'])
def get_recent_alerts():
    """Get recent high/medium risk alerts"""
    limit = int(request.args.get('limit', 10))

    # Filter for high and medium risk only
    alerts = [p for p in posts_db if p['risk'] in ['high', 'medium']]
    alerts = alerts[:limit]

    return jsonify({
        "alerts": alerts,
        "total": len(alerts)
    })


@app.route('/api/config', methods=['GET'])
def get_config():
    """Get current configuration"""
    return jsonify(config_db)


@app.route('/api/config', methods=['PUT'])
def update_config():
    """Update configuration"""
    data = request.json

    # Update config
    if 'bannedKeywords' in data:
        config_db['bannedKeywords'] = data['bannedKeywords']
    if 'highRiskTerms' in data:
        config_db['highRiskTerms'] = data['highRiskTerms']
    if 'pageId' in data:
        config_db['pageId'] = data['pageId']
    if 'checkInterval' in data:
        config_db['checkInterval'] = data['checkInterval']

    # TODO: Save to config file or database

    return jsonify({"success": True, "config": config_db})


@app.route('/api/check/trigger', methods=['POST'])
def trigger_check():
    """Manually trigger a post check"""
    # TODO: Implement manual trigger of post checker
    return jsonify({
        "success": True,
        "message": "Post check triggered"
    })


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    # Initialize with some sample data for testing
    sample_posts = [
        {
            "id": "1234567890",
            "message": "Limited time offer! Get 50% off on all products. Click now!",
            "risk": "high",
            "keywords": ["limited", "offer"],
            "timestamp": datetime.now().isoformat(),
            "from": "Test Page",
            "type": "status"
        },
        {
            "id": "1234567891",
            "message": "URGENT: Special sale ending tonight! Don't miss out!",
            "risk": "high",
            "keywords": ["urgent", "sale"],
            "timestamp": (datetime.now() - timedelta(minutes=30)).isoformat(),
            "from": "Test Page",
            "type": "status"
        },
        {
            "id": "1234567892",
            "message": "Check out our new product line. Visit our website for more details.",
            "risk": "medium",
            "keywords": [],
            "timestamp": (datetime.now() - timedelta(hours=1)).isoformat(),
            "from": "Test Page",
            "type": "link"
        },
        {
            "id": "1234567893",
            "message": "Thank you for your continued support!",
            "risk": "low",
            "keywords": [],
            "timestamp": (datetime.now() - timedelta(hours=2)).isoformat(),
            "from": "Test Page",
            "type": "status"
        }
    ]

    posts_db.extend(sample_posts)
    stats_db = {
        "total": len(sample_posts),
        "high": len([p for p in sample_posts if p['risk'] == 'high']),
        "medium": len([p for p in sample_posts if p['risk'] == 'medium']),
        "low": len([p for p in sample_posts if p['risk'] == 'low']),
        "today": len(sample_posts)
    }

    print("🚀 Starting FB Post Shield API Server...")
    print("📊 Sample data loaded")
    print("🌐 Server running on http://localhost:5000")

    app.run(debug=True, host='0.0.0.0', port=5000)
