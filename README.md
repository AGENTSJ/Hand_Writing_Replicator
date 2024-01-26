# Capital_Hand_Writing_Replicator

The project aims to recognize handwritten images containing all English letters and digits  from user input, followed by storing them in a dedicated database. Upon the user's request for the conversion of an English paragraph, the application seamlessly transforms the input string into the user's distinctive handwriting. This ensures a personalized and refined experience for users seeking a unique representation of their text in a handwritten format.

## models trained on emnist data set with OVA(One versus Rest) Classification technique

## Install requirements

```bash
conda create -P hwr
conda activate hwr/
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
cd /Backend/components
python3 index.py
```
### Frontend is running on port 5000 on local host

### Run Frontend Development with Vite

```bash
cd ./Capital_Hand_Writing_Replicator/Hwr-Front
npm install
npm run dev
```
# preview 

## Display :

<img src="https://github.com/AGENTSJ/Capital_Hand_Writing_Replicator/assets/109428699/62adc64e-95b0-42a6-b2f9-324a3ddf8b40" height="300px"/>

## Login page :

<img src="https://github.com/AGENTSJ/Capital_Hand_Writing_Replicator/assets/109428699/98f0e3dd-59e9-4cfd-b8b8-fc48ceacba00" height="300px">

## Dash board : 

<img src="https://github.com/AGENTSJ/Capital_Hand_Writing_Replicator/assets/109428699/3678ed28-0cc6-425c-bd75-c751a106dd0f" height="300px">

