
from flask import jsonify
import cv2
import numpy as np
import base64
import sys

sys.path.append(r"../components")


            
def Make_Compatible_toDB(alph_arr):
    """""
    converts numpy array inside alph_arr to list

    """""
    compatible_alph_arr = []
    for i in range(len(alph_arr)):
        temp = []
        for j in range(len(alph_arr[i])):
            
            temp.append(alph_arr[i][j].tolist())
       
        compatible_alph_arr.append(temp)
    return compatible_alph_arr
        
def Make_usable(alph_arr):
    """""
    converts list  inside alph_arr to numpy array with dtye uint8

    """""
    Usable_alph_arr = []
    for i in range(len(alph_arr)):
        temp = []
        for j in range(len(alph_arr[i])):
            
            temp.append(np.array(alph_arr[i][j],dtype=np.uint8))
       
        Usable_alph_arr.append(temp)
    return Usable_alph_arr

class alphabetstore:

    def __init__(self,user_id,aplh_arr,dimen_arr):
        self.user_id = user_id
        self.aplh_arr = Make_Compatible_toDB(aplh_arr)
        self.dimen_arr = dimen_arr
    

    def add_into_store(self,store_Collection):
        """""
        adds alpbahets images into store for each user

        """""
        try :

            store = store_Collection.find_one({"user_id":self.user_id})

            if store is None:
                
                store_Collection.insert_one(vars(self))
            else:
                old_alph_arr = store['aplh_arr'] 
                old_dimen_arr = store['dimen_arr']

                new_alph_arr = []
                new_dimen_arr = []

                for i in range(len(old_alph_arr)):
                    new_alph_arr.append(old_alph_arr[i] + self.aplh_arr[i])
                    new_dimen_arr.append(old_dimen_arr[i] + self.dimen_arr[i])
                  

                store_Collection.update_one({"user_id":self.user_id},{"$set":{"aplh_arr":new_alph_arr,"dimen_arr":new_dimen_arr}})

            return {"state":True}
        except Exception as e:
           
            return {"error from add_into_store":str(e),"state":False}
        
    def Get_Alpbhabets_and_Dimen(user_id,store_Collection):
        try:
            store = store_Collection.find_one({"user_id":user_id})
            if store is None:
                return False
            else:
                return {"message":"success","alph_arr":Make_usable(store['aplh_arr']),"dimen_arr":store['dimen_arr']}
        except Exception as e:
            return jsonify({"error from get_from_store":str(e)}),500
    
    def Check_Store(user_id,store_Collection):
        """""
        returns new_status and missing_alph
        new_status is True missing_alph is full(26)

        """""
        try:
            new_status = True

            store = store_Collection.find_one({"user_id":user_id})
            missing_alph = []
            if store is None:
                
                for ascii_value in range(ord('A'), ord('Z') + 1):
                    missing_alph.append(chr(ascii_value))
                
                return {"new_status":new_status,"missing_alph":missing_alph,"flag":True}
            else:
                alph_arr = store['aplh_arr']
                dimn_arr = store['dimen_arr']
                

                for i in range(len(alph_arr)):
                    if len(alph_arr[i])==0:
                        missing_alph.append(chr(i+65))

                if len(missing_alph)!=0:
                    new_status = False
                    
                return {"new_status":new_status,"missing_alph":missing_alph,"flag":True}

        except Exception as e:
            return jsonify({"error from get_from_store":str(e),"flag":True}),500