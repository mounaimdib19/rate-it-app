from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, nullable=False)
    business_id = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    moderation_status = db.Column(db.String(50), nullable=False, default='pending')  # 'pending', 'approved', 'rejected'
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)