# Hand_Writing_Replicator

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

## Writer :

<img src="https://github.com/AGENTSJ/Hand_Writing_Replicator/assets/109428699/81e1754d-8bc1-458f-9b1d-16f9d559f1ef" height="300px"/>

## Login page :

<img src="https://github.com/AGENTSJ/Hand_Writing_Replicator/assets/109428699/ced72410-ac42-4e78-8d62-6420867c9c5c" height="300px">

## Dash board : 

<img src="https://github.com/AGENTSJ/Hand_Writing_Replicator/assets/109428699/5d1f2349-2182-453f-8066-5ffd56afbc07" height="300px">

## Guide :
<img src="https://github.com/AGENTSJ/Hand_Writing_Replicator/assets/109428699/630c7a6a-2954-4a39-b9a8-642aa214f42a" height="300px">

