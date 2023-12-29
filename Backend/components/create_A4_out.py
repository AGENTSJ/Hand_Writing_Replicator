import sys

sys.path.append('../../MachineLearning/Models')
from aphabet_store import alphabetstore 
from flask import jsonify
from flask import jsonify,request,Blueprint,Flask
from flask_pymongo import PyMongo
import cv2
import numpy as np
import random

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/learn'
mongo = PyMongo(app)
Store_collection = mongo.db.stores

# map alphabet with 0 -26

def display(img):
    cv2.imshow('img', img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def resize(img,scale = 0.3):
    width = int(img.shape[1]*scale)
    height = int(img.shape[0]*scale)
    dim = (width,height)
    return cv2.resize(img,dim,interpolation = cv2.INTER_AREA)


alphab = "abcdefghijklmnopqrstuvwxyz0"## 0 for any un wanted noises
alphabet_dict = {}
for i, letter in enumerate(alphab.upper()):
    alphabet_dict[letter] = i




height = 1000
margin= int(0.025*height)

def create_A4_out(user_id,inputstring):
    """""
    creates A4 size image with all the alphabets and dimensions of the user

    """""
    try:
        
        result = alphabetstore.Get_Alpbhabets_and_Dimen(user_id=user_id,store_Collection=Store_collection)
        if not result:
            
            return jsonify({"message":"error from get_apbaet_deimen"}),404
        
        alph_arr,dimen_arr = result['alph_arr'],result['dimen_arr']


        A4 = np.ones((height,int(height/1.4)),dtype=np.uint8)*255
        start_height = margin
        start_left = margin
        scale = 0.5#size of font

        lineheight = 100
        lineheight = int(lineheight*scale)

        wordspace = 30
        wordspace = int(wordspace*scale)

        shaped = A4.shape
        for i ,lett in enumerate(inputstring.upper()):

            if(lett == " "):
                    start_left = start_left+wordspace
            elif(lett == "\n"):
                start_left = margin
                start_height = start_height+lineheight
            else:
                
                idx = alphabet_dict[lett]
                if len(alph_arr[idx])!=0:

                    variety_idx = random.randint(0,len(alph_arr[idx])-1)

                    w,h = dimen_arr[idx][variety_idx]
                    w,h = int(w*scale),int(h*scale)
            
                    if(start_left+w>=shaped[1]-margin):# if the char image reached the right margin
                        start_left = margin
                        start_height = start_height+lineheight

                        if start_height+h>=shaped[0]-margin: # if the image is full reached the bottom margin
                    
                            return{"flag":True,"a4":A4,"space":False}
                            # break
                   
                    alphimg = resize(alph_arr[idx][variety_idx],scale)

                    A4[start_height:start_height+h,start_left:start_left+w] = alphimg
                    start_left = start_left+w

        return {"flag":True,"a4":A4,"space":True}
                    
                
        
    except Exception as e:
        print(e)
        print("error from get_apbaet_deimen")
        return {"error from create_A4_out":str(e),"flag":False,"space":False}









