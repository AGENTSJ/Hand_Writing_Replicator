import sys
import jwt
sys.path.append(r'D:\ACtive\Hand_Writing_Replicator\Backend\models')
sys.path.append(r'D:\ACtive\Hand_Writing_Replicator\Backend\middleware')
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
        hashed = bcrypt.hashpw(data['password'].encode('utf-8'),bcrypt.gensalt())
        newuser = User(username=data['username'],email=data['email'],password=hashed)
        
        User_collection.insert_one(vars(newuser))

        return "<p>create user</p>"
    
    except Exception as e:
        return jsonify({"error":str(e)}),500
    

    
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

                return jsonify({'token':token})


    except Exception as e:
        
        return jsonify({"error":str(e)}),500


@user_bp.route('/profile',methods=['GET'])


def profile():
    try:
        valid = auth(request)
        if valid:

            return jsonify({"user":request.user})
        else:
            return jsonify({"error":"invalid token"}),500
        
    except Exception as e:
        return jsonify({"error from profile":str(e)}),500