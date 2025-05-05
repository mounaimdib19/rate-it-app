from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), default='reviewer')

    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

# Business model class
class Business(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    wilayaId = db.Column(db.Integer, nullable=False)
    address = db.Column(db.Text, nullable=False)
    contact = db.Column(db.String(255), nullable=False)
    operating_hours = db.Column(db.Text)
    facebook = db.Column(db.String(255))
    instagram = db.Column(db.String(255))
    linkedin = db.Column(db.String(255))
    description = db.Column(db.Text)
    logo_url = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('business.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    moderation_status = db.Column(db.String(20), default='pending')  # pending, approved, rejected

    
    user = db.relationship('User', backref=db.backref('reviews', lazy=True))
    
    business = db.relationship('Business', backref=db.backref('reviews', lazy=True))

