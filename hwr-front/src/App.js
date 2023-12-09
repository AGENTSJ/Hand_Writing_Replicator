import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './components/login';
import { AuthContext } from './context/authcontext';
import { useContext } from 'react';

import Utility from './components/utility';

function App() {

  const[authToken, setAuthToken] = useState(null);
  const[logState, setLogState] = useState(false);
  
  async function verifyToken(){

    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    
    const response =  await fetch('http://localhost:5000/user/verify', {
      method: 'POST',
      headers:{
        "content-type": "application/json",
        "Authorization":token?token.split('=')[1]:token

      },
      body: JSON.stringify({token: token})
     })

    const data = await response.json();
    // console.log("user is valid : ",data.valid);

    if(data.valid){
      
      setLogState(true);
      setAuthToken(token);
      
    }
    
  }
  useEffect(() => {
    verifyToken(); 
  }, []);


  return (
    <AuthContext.Provider value = {{authToken,setAuthToken}}>

      <div className="App">
        {logState?<Utility></Utility>:<Login props={{logState,setLogState}}></Login>}
      </div>
      

    </AuthContext.Provider>
   
  );
}


export default App;
