from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np

import sys
sys.path.append(r'D:\ACtive\Hand_Writing_Replicator\Backend\routes')
app = Flask(__name__)


from user import user_bp
from image_upload import image_bp

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(image_bp, url_prefix='/image')


@app.route('/',methods=['GET'])

def hello():
    
    return " <p>welcome to handwritting replicator</p>"

if __name__ == '__main__':
    app.run(port=5000)

