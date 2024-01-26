import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/login';
import { AuthContext } from './context/authcontext';
import Write from './components/Write';
import Dash from './components/Dash';
import Guide from './components/Guide';

import Utility from './components/utility';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Utility />,
    children: [
      { path:"",
        element:<Guide/>,
        index:true
      },
      {
        path: "write",
        element: <Write />
      },
      {
        path:"dash",
        element:<Dash/>
      }
    ],
  },
]);

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
        {logState?<RouterProvider router={router} />:<Login props={{logState,setLogState}}></Login>}
      </div>
      

    </AuthContext.Provider>
   
  );
}


export default App;
