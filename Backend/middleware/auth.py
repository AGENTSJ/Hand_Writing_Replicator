import jwt
from flask import request,jsonify

secret_key = "ItWasSupposedToBeMERN_Stack"


def verify():
    try:
        token = request.headers['Authorization']
        payload = jwt.decode(token,secret_key,algorithms=["HS256"])
        request.user = payload
        
        return True
    except Exception as e:
        
        return jsonify({"error from middleware(verify())":str(e)}),500

# def auth_required(next):

#     def wrapper(*args,**kwargs):
#         try:
          
#             verify()
#             return next(*args,**kwargs)
        
#         except Exception as e:
#             print("error from middleware")
#             return jsonify({"error from middleware":str(e)}),500
            
#     return wrapper

def auth(req):
    try:
        verify()
        return True
    except Exception as e:
        print(e)
        return False

