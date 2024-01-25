from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from flask import Flask, send_from_directory
import os
import sys

sys.path.append('../routes')

app = Flask(__name__, static_folder='../../Frontend_build/dist')


CORS(app)

from user import user_bp
from image_upload import image_bp

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(image_bp, url_prefix='/image')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(port=5000)

