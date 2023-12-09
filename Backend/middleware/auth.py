import jwt
from flask import request,jsonify

secret_key = "ItWasSupposedToBeMERN_Stack"


def verify():

    try:
        
        
        token = request.headers['Authorization']
       
        if token is None:
            return False
        else:
        
            payload = jwt.decode(token,secret_key,algorithms=["HS256"])
            request.user = payload
            
            return True
            
    except Exception as e:
        return False


def auth():
    try:
        
        valid = verify()
        if valid:
            return True
        else:
            return False
        
    except Exception as e:
        print("error in authfn \n",e)
        return False

