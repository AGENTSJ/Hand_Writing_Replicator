
import cv2 as cv
import numpy as np
import math , os
import tensorflow as tf

alphabets = [chr(y) for y in range(ord("A"),ord("Z")+1) ]+ [chr(y) for y in range(ord("a"),ord("z")+1) ]+[str(i) for i in range(10)]

"""utility functions"""

def display(img):
    cv.imshow('img', img)
    cv.waitKey(0)
    cv.destroyAllWindows()

def resize(img,scale = 0.3):
    width = int(img.shape[1]*scale)
    height = int(img.shape[0]*scale)
    dim = (width,height)
    return cv.resize(img,dim,interpolation = cv.INTER_AREA)

def distance(cord1,cord2):
   cord1= np.array(cord1)
   cord2 = np.array(cord2)
   return math.sqrt(np.sum((cord1-cord2)**2))

def padding(image):
    
    original_rows, original_cols = image.shape
    padding_rows = 10  
    padding_cols = 10  
    padded_rows = original_rows + 2 * padding_rows
    padded_cols = original_cols + 2 * padding_cols
    padded_image = np.zeros((padded_rows, padded_cols), dtype=np.uint8)
    padded_image[padding_rows:padding_rows + original_rows, padding_cols:padding_cols + original_cols] = image
    image = cv.resize(padded_image,(28,28))
    return image

"""DETECTION MODEL UTILITIES"""

def loadedModels(path,START):
    alphabets = [chr(y) for y in range(ord("A"),ord("Z")+1) ]+ [chr(y) for y in range(ord("a"),ord("z")+1) ]+["D"+str(i) for i in range(10)]
    # print(alphabets)
    models =[]
    for i in range(len(os.listdir(path))):
        # print(f'{path}/{alphabets[START+i]}.h5')
        model = tf.keras.models.load_model(f'{path}/{alphabets[START+i]}.h5')
        models.append(model)
    return models
        
def OVApipeline(models,model_Inp,conf_thresh):
    """One Versus All classification"""
    
    result = np.zeros(len(models))
    for i in range(len(models)):

        res = models[i].predict(model_Inp,verbose =0)
        
        result[i] = res[0][0]
     
    return result

def analysis(image,models,START):
    
    model_Inp = image.reshape(1,28,28)
    result =OVApipeline(models,model_Inp,conf_thresh=0.7)
    
    index = np.argmax(result)

    alph = "undef"
    if(np.max(result)!=0):
        alph = alphabets[index+START]
    print("////////////",alph)
    
    return index

"""main functions"""

def Extract_Contours(img):

    """""
    extracts contours from the input image and store its cordinates (x,y) into cords[]
    using boundingrect function

    also exports some params that are needed down the pipeline (main_pipeline function)

    """""

    img = resize(img)
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    edged = cv.Canny(gray, 50, 200)
    cords =[]

    threshold_value = 150
    _, binary_image = cv.threshold(gray, threshold_value, 255, cv.THRESH_BINARY)

    inputBINARY =cv.bitwise_not(binary_image)
    inputBINARY = cv.GaussianBlur(inputBINARY, (5, 5), 0)
    contours,_ = cv.findContours(edged,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_NONE)
    
    for cont in contours:
        x,y,w,h = cv.boundingRect(cont)
        cords.append([x,y])

    cords = np.array(cords)

    return [cords,inputBINARY,contours,binary_image]

def Set_DistanceMatrix(cords):

    """""
    sets the distance matrix it contains the distance between every contours

    note : distance matrix is set such a way that if teh distance is bellow a certain threshold ie Dthresh it is normalised into 1 else 0
    thus it can be converted into a graph problem 

    """""
    Dthresh = 30 #Dthresh : it is the estimate minimum distance that seperates each aphabet from user inputimage
    distanceMatrix=[]
    for cor1 in cords:

        temp=[]
        for cor2 in cords:
            dist = distance(cord1=cor1,cord2=cor2)
            if dist <= Dthresh:
                temp.append(1)
            else:
                temp.append(0)
            
            
        distanceMatrix.append(temp)

    distanceMatrix = np.array(distanceMatrix)

    return distanceMatrix

def Find_NearbyContours(distanceMatrix):
    
    """""
    it finds neaby contours belonging to same alphabet and stores them into an array connected[]
    by depth first search algorithm

    """""
    visited = set()  # stores indexes
    connected = []  # stores array of connected index
    collector = []  # stores indexes

    ## uses dpfs
    def findconnected(submatrix,idx):

        if idx not in visited:

            visited.add(idx)

            if idx not in collector:
                collector.append(idx)

            for i in range(len(submatrix)):

                if submatrix[i]==1:
                    if i not in visited:
                        collector.append(i)
            
            for nodeidx in collector:
                if nodeidx not in visited:
                    findconnected(distanceMatrix[nodeidx],nodeidx)



    for runidx in range(len(distanceMatrix)):

        findconnected(distanceMatrix[runidx],runidx)
        
        if len(collector)!=0:
            connected.append(collector)
        collector=[]

    return connected

def Detect_and_Store(connected,contours,inputBINARY,binary_image,STATE=0):
    """""
    Input : 
        STATE : 0->Captial letters ,1->Small letter , 2->Digits

    Function :
        predicts the labels (alphabet) for the corresponding connected contours and dimentions then store it in an array
        ALP_arr[]
        Dimn_arr[]

    """""
   
    Capitial_model_path = "/home/abhijith/Desktop/Capital_Hand_Writing_Replicator/MachineLearning/Emnist-Models/ISO-MERGE-CAP"
    Small_model_path = "/home/abhijith/Desktop/Capital_Hand_Writing_Replicator/MachineLearning/Emnist-Models/ISO-MERGE-SMALL"
    Digit_model_path = "/home/abhijith/Desktop/Capital_Hand_Writing_Replicator/MachineLearning/Emnist-Models/ISO-MERGE-DIGIT"
    
    startVar=0
    path = Capitial_model_path

    if STATE ==1:
        startVar = 26
        path=Small_model_path

    elif STATE ==2:
        startVar = 52
        path = Digit_model_path

    models = loadedModels(path,startVar)
    
    ALP_arr = []
    Dimn_arr =[]

    for i in range(62):
        ALP_arr.append([])
        Dimn_arr.append([])
    
    Similar_contour_cluster = []
    similar_contour_dimen = []

    for con in connected:
        temp = np.array([])

        for idx in con:
            if len(temp)==0:
                temp = contours[idx]
            else:
                temp = np.concatenate((temp,contours[idx]))
        
        x,y,w,h = cv.boundingRect(temp)
        
        minimum_width = 12 ## to eliminate any noises

        if w > minimum_width:

            Similar_contour_cluster.append(temp)
            similar_contour_dimen.append([x,y,w,h])
            
            image = inputBINARY[y:y+h,x:x+w]
            image = padding(image)        
            
            index = analysis(image,models,startVar)

            index =index+startVar
            
            ALP_arr[index].append(binary_image[y:y+h,x:x+w])
            Dimn_arr[index].append([w,h])
        
    return [ALP_arr,Dimn_arr]

def Find_Mising(Dimn_arr):
    """
    finds the alphabet not detected by model
    """
    alphabets = [chr(y) for y in range(ord("A"),ord("Z")+1) ]+ [chr(y) for y in range(ord("a"),ord("z")+1) ]+[str(i) for i in range(10)]

    miss_alph =[]

    for idx ,alp in enumerate(Dimn_arr):
        
        if len(alp)==0:
            miss_alph.append(alphabets[idx])

 
    return miss_alph
            # query from db and find the missing alphabet in next update
 
def Main_Pipeline(img,STATE):
    
    """
    takes an image as input and return 

    ALP_arr : an array consisting of detected alphabets images in a-z order
    Dimn_arr : an array consiting of dimention of the corresponding image
    missing_Alpha : an array of missing alpbaets that are unable to detect by model

    """
    
    cords,inputBINARY,contours,binary_image= Extract_Contours(img) 

    distanceMatrix = Set_DistanceMatrix(cords=cords)
    
    connected = Find_NearbyContours(distanceMatrix=distanceMatrix)
    
    ALP_arr ,Dimn_arr = Detect_and_Store(connected=connected,contours=contours,inputBINARY=inputBINARY,binary_image=binary_image,STATE=STATE)
    
    missing_Alpha = Find_Mising(Dimn_arr)
    

    return ALP_arr,Dimn_arr,missing_Alpha

