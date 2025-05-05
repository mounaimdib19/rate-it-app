from flask import Flask, request, jsonify, session
from supabase import create_client

app = Flask(__name__)
app.secret_key = 'your_secret_key'


SUPABASE_URL = "your_supabase_url"
SUPABASE_KEY = "your_supabase_key"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Submit a Review
@app.route('/user/Reviews', methods=['POST'])
def submit_review():
    data = request.json
    user_id = data.get('user_id')
    business_id = data.get('business_id')
    rating = data.get('rating')
    review_text = data.get('review_text')

    if not (user_id and business_id and rating and review_text):
        return jsonify({'error': 'Missing required fields.'}), 400

    # Check if user submitted a review for this business
    existing_review = supabase.table('reviews').select('*').eq('user_id', user_id).eq('business_id', business_id).execute()
    if existing_review.data:
        return jsonify({'error': 'User has already submitted a review for this business.'}), 400

    
    response = supabase.table('reviews').insert({
        'user_id': user_id,
        'business_id': business_id,
        'rating': rating,
        'review_text': review_text,
        'moderation_status': 'pending'
    }).execute()

    if response.status_code == 201:
        return jsonify({'message': 'Review submitted successfully and is awaiting moderation.'}), 201
    else:
        return jsonify({'error': 'Failed to submit review.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
