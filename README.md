# Capital_Hand_Writing_Replicator

the project aims to detect handwritten images from user iput containing their handwriting in capital english letters and store it into database

when the user need to convert any english paragraph ,the use can give the paragraph as input string and the app will convert into their own handwritting
## Install requirements

```bash
conda create --name hwr
conda activate hwr
conda install flask-cors
conda install flask
conda install python=3.10
conda install opencv
conda install pyjwt
conda install pymongo
pip install Flask-PyMongo
conda install bcrypt
conda install tensorflow
```
## Run mongod server 
```bash
#Linux
sudo systemctl start mongod

#windows
mongod
```
## Run Server
```bash
conda activate hwr
cd ./Capital_Hand_Writing_Replicator/Backend/components
python3 index.py
```
### Run Frontend

```bash
cd ./Capital_Hand_Writing_Replicator/Hwr-Front
npm install
npm run dev
```
# preview 

## Display :

<img src="https://github.com/AGENTSJ/Capital_Hand_Writing_Replicator/assets/109428699/c13f2043-d66c-4306-8d05-623667868fc5" height="300px"/>

## Login page :

<img src="https://github.com/AGENTSJ/Capital_Hand_Writing_Replicator/assets/109428699/3c3aae1b-3c02-44ae-982f-fbe0853c3edb" height="300px">

## Dash board : 

<img src="https://github.com/AGENTSJ/Capital_Hand_Writing_Replicator/assets/109428699/5ffb047f-4ee5-4e13-b7db-0996d42c4b69" height="300px">











