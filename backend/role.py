from functools import wraps
from flask import request, jsonify
from models import User

def role_required(required_role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Get the current user's email from the request (assume user is authenticated via JWT or session)
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'message': 'Token is missing'}), 403

            # Assuming you decode the token and get the user's email
            email = decode_token(token)  # Decode token function should be implemented

            user = User.query.filter_by(email=email).first()
            if not user:
                return jsonify({'message': 'User not found'}), 404

            if user.role != required_role:
                return jsonify({'message': 'Permission denied'}), 403
            
            return f(*args, **kwargs)

        return decorated_function
    return decorator
