from flask import Flask, request, jsonify, session
from flask_cors import CORS
from functools import wraps
from models import db, User
from config import Config

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")


# Flask app configuration
app.config.from_object(Config)
db.init_app(app)



# Middleware for admin authentication
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_role = session.get('user_role')  # Or decode from JWT
        if user_role != 'admin':
            return jsonify({'error': 'Unauthorized access'}), 403
        return f(*args, **kwargs)
    return decorated_function

# User signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json

    # Check if email already exists
    if User.get_user_by_email(data['email']):
        return jsonify({'error': 'Email already registered'}), 400

    new_user = User(
        first_name=data['firstName'],
        last_name=data['lastName'],
        email=data['email'],
        password=data['password'],  # Store plaintext password
        role=data.get('role', 'reviewer')
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully', 'firstName': data['firstName']}), 201


# Business registration route
# Business registration route
@app.route('/register-business', methods=['POST'])
def register_business():
    data = request.json

    # Validate required fields
    required_fields = ['name', 'email', 'password', 'address', 'contact']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    # Check if the email is already registered
    if Business.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email is already registered'}), 400

    # Create a new business object
    new_business = Business(
        name=data['name'],
        email=data['email'],
        password=data['password'],  # In production, hash passwords before storing
        wilayaId=int(data['wilayaId']),  # Ensure you're using wilayaId correctly
        address=data['address'],
        contact=data['contact'],
        operating_hours=data.get('operatingHours', ''),
        facebook=data.get('facebook', ''),
        instagram=data.get('instagram', ''),
        linkedin=data.get('linkedin', ''),
        description=data.get('description', ''),
        logo_url=data.get('logoUrl', '')
    )

    # Save the new business to the database
    db.session.add(new_business)
    db.session.commit()

    return jsonify({'message': 'Business registered successfully!'}), 201



# User login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.get_user_by_email(email)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    if user.password != password:  # Compare plaintext passwords
        return jsonify({'error': 'Invalid password'}), 403

    return jsonify({'message': 'Login successful', 'user': {
        'id': user.id,
        'firstName': user.first_name,
        'lastName': user.last_name,
        'email': user.email,
        'role': user.role
    }}), 200

# Test route to check if Flask is connected
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Flask is connected'})


@app.route('/submit-review', methods=['POST'])
def submit_review():
    data = request.json

    # Validate required fields
    required_fields = ['businessId', 'rating', 'comment']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400

    # Validate rating is between 1 and 5
    if not 1 <= data['rating'] <= 5:
        return jsonify({'error': 'Rating must be between 1 and 5'}), 400

    # Check if user exists
    user = User.query.get(data['userId'])
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Check if business exists
    business = Business.query.get(data['businessId'])
    if not business:
        return jsonify({'error': 'Business not found'}), 404

    # Create new review
    new_review = Review(
        user_id=data['userId'],
        business_id=data['businessId'],
        rating=data['rating'],
        comment=data['comment']
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify({
        'message': 'Review submitted successfully',
        'review': {
            'id': new_review.id,
            'userId': new_review.user_id,
            'userName': f"{user.first_name} {user.last_name}",
            'rating': new_review.rating,
            'comment': new_review.comment,
            'createdAt': new_review.created_at,
            'moderationStatus': new_review.moderation_status
        }
    }), 201



# Run the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
