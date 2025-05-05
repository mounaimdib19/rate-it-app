from flask import Flask, request, jsonify, session
from functools import wraps
from supabase import create_client

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# setup for supabase
SUPABASE_URL = "your_supabase_url"
SUPABASE_KEY = "your_supabase_key"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Middleware for admin authentication
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_role = session.get('user_role')  # Or decode from JWT
        if user_role != 'admin':
            return jsonify({'error': 'Unauthorized access'}), 403
        return f(*args, **kwargs)
    return decorated_function

# View Pending Reviews
@app.route('/admin/Reviews', methods=['GET'])
@admin_required
def get_pending_reviews():
    reviews = supabase.table('reviews').select('*').eq('moderation_status', 'pending').execute()
    return jsonify(reviews.data), 200

# Approve a Review
@app.route('/admin/Reviews', methods=['POST'])
@admin_required
def approve_review(review_id):
    response = supabase.table('reviews').update({'moderation_status': 'approved'}).eq('id', review_id).execute()
    if response.status_code == 200:
        return jsonify({'message': 'Review approved successfully.'}), 200
    else:
        return jsonify({'error': 'Failed to approve review.'}), 500

# Reject a Review
@app.route('/admin/Reviews', methods=['POST'])
@admin_required
def reject_review(review_id):
    response = supabase.table('reviews').update({'moderation_status': 'rejected'}).eq('id', review_id).execute()
    if response.status_code == 200:
        return jsonify({'message': 'Review rejected successfully.'}), 200
    else:
        return jsonify({'error': 'Failed to reject review.'}), 500

if __name__ == '__main__':
    app.run(debug=True)