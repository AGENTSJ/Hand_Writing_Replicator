# Capital_Hand_Writing_Replicator

The project aims to recognize handwritten images containing capital English letters from user input, followed by storing them in a dedicated database. Upon the user's request for the conversion of an English paragraph, the application seamlessly transforms the input string into the user's distinctive handwriting. This ensures a personalized and refined experience for users seeking a unique representation of their text in a handwritten format.

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
## Run mongoDB server 
```bash
#Linux
sudo systemctl start mongod
```
```bash
#windows
mongod
```
## Run Server
```bash
conda activate hwr
cd Backend/components
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











