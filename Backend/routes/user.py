import sys
import jwt
from bson import ObjectId
import re
# from email_validator import validate_email, EmailNotValidError
sys.path.append(r'../models')
sys.path.append(r'../routes')
sys.path.append(r'../middleware')

from flask import Blueprint,Flask, request, jsonify
from flask_pymongo import PyMongo
from User_model import User
import bcrypt
import datetime
# from auth import auth_required
from auth import auth


user_bp = Blueprint('user',__name__)


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/learn'
mongo = PyMongo(app)


with app.app_context():
    mongo.db.users.create_index([('email', 1)], unique=True)


User_collection = mongo.db.users

SECRET_KEY = "ItWasSupposedToBeMERN_Stack"     

@user_bp.route('/create',methods=['POST'])

def create():
    try:
            
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']

        if not re.match("^[a-zA-Z0-9_]*$", username):
            return jsonify({"error": "Invalid username. Only alphanumeric characters and underscores are allowed."}), 400

        try:
            v = validate_email(email) 
            email = v["email"] 
        except EmailNotValidError as e:
            
            return jsonify({"error":"not a valid email","status":0}), 400
        
        if len(password) < 8:
            return jsonify({"error": "Password must be at least 8 characters long.","status":0}), 400
        
        hashed = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        newuser = User(username=username,email=email,password=hashed)
        
        User_collection.insert_one(vars(newuser))

        return jsonify({"message":"success","status":1}),200
    
    except Exception as e:
        # print(e)
        return jsonify({"error":"server error or User already exsits","status":0}),500
    

    
@user_bp.route('/login',methods=['POST'])

def login():

    try:
        data = request.get_json()
        loger = User_collection.find_one({"email":data['email']})
        
        if loger is not None:

            if bcrypt.checkpw(data['password'].encode('utf-8'),loger['password']):

                payload ={
                    "user_id":str(loger['_id']),
                    "username":loger['username'],
                    "expiry":(datetime.datetime.utcnow() + datetime.timedelta(days=1)).isoformat()
                }

                token = jwt.encode(payload,SECRET_KEY,algorithm="HS256")

                return jsonify({'token':token,'valid':True})
            
            else:
                return jsonify({"error":"Invalid credentials","valid":False}),500
        else:
            return jsonify({"error":"Invalid credentials","valid":False}),500

    except Exception as e:
        
        return jsonify({"error":str(e)}),500


@user_bp.route('/verify',methods=['POST'])


def validity():
    try:

        valid = auth()

        if valid:
            return jsonify({"valid":True})
        else:
            return jsonify({"valid":False}),500
        
    except Exception as e:
        # print(e)
        return jsonify({"error from profile":str(e),"valid":False}),500
    
@user_bp.route('/profile',methods=['GET'])

def profile():
    try:
        valid = auth()
        if valid:
            
            data = request.user
            # print(data)
            user = User_collection.find_one({"_id":ObjectId(data['user_id'])})
            # print(user)

            return jsonify({"username":user['username'],'email':user['email']})
        else:
            return jsonify({"valid":False}),500
    except Exception as e:
        return jsonify({"error from profile":str(e),"valid":False}),500
    