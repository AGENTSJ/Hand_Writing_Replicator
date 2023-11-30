from flask import Blueprint,Flask, request, jsonify
import numpy as np
import base64
import cv2
import sys
sys.path.append(r'D:\ACtive\Hand_Writing_Replicator\Backend\models')
sys.path.append(r'D:\ACtive\Hand_Writing_Replicator\Backend\middleware')
sys.path.append(r'D:\ACtive\Hand_Writing_Replicator\Backend\components')

from aphabet_store import alphabetstore
from flask_pymongo import PyMongo
from detect_and_export import Main_Pipeline,display
from create_A4_out import create_A4_out
from auth import auth


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/learn'
mongo = PyMongo(app)

image_bp = Blueprint('image',__name__)

Store_collection = mongo.db.stores

def convert_base64(nparr):
    ret, image_bytes = cv2.imencode(".png", nparr)
    base64_image = base64.b64encode(image_bytes.tobytes()).decode('utf-8')
    return base64_image

# routes


@image_bp.route('/',methods=['GET'])
def hello():
    return " <p>welcome to handwritting replicator inside image</p>"

@image_bp.route('/upload',methods=['POST'])
def upload():

    try:
        valid = auth()
        
        if valid:
            
            data = request.get_json()
            img = data['image']
            
            header, base64_image_data = img.split(',')
            
            nparr = np.frombuffer(base64.b64decode(base64_image_data), np.uint8)
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            ALP_arr,Dimn_arr,missing_Alpha =Main_Pipeline(image)
            user = request.user

            store = alphabetstore(user_id=user['user_id'],aplh_arr=ALP_arr,dimen_arr=Dimn_arr)
            result = store.add_into_store(Store_collection)
            
            if not result['state']:
                return result #contain error message

            return jsonify({"message":"success","missing_Alpha":missing_Alpha}),200
        else:
            return jsonify({"message":"unauthorised"}),404

    except Exception as e:
        return jsonify({"error by upload image":str(e)}),500
        


@image_bp.route('/aout',methods=['POST'])
# this routes gives user the end a4 size sheet that is encoded in base64

def A4out():

    try:
        valid = auth()
        if valid:
            data = request.get_json()

            result = create_A4_out(request.user['user_id'],data['inputstring'])

            if result['flag']:

                if result['space']:# true if there was enough space to write the string
                    # display(result['a4'])
                    return jsonify({"a4":convert_base64(result['a4']),'space':True}),200
                else:
                    # display(result['a4'])
                    return jsonify({"a4":convert_base64(result['a4']),'space':False}),200
            else:
                return jsonify({"message":"error from A4 out"}),404

           
            
    except Exception as e:      
        return jsonify({"error by A4 out":str(e)}),500
   


