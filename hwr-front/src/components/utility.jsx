import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import '../styles/utility.css'
import { useContext } from 'react'
import { AuthContext } from '../context/authcontext';
import Display from './display';
import Dash from './Dash';
const Utility = () => {
  
  const {authToken,setAuthToken} = useContext(AuthContext)
  const [page,setpage] = useState("display")
  const disp = useRef(null)
  const dash = useRef(null)

  useEffect(()=>{
    if(page==="display"){
      disp.current.classList.add("current")
      dash.current.classList.remove("current")
    }else{
      dash.current.classList.add("current")
      disp.current.classList.remove("current")
    }
  },[page])

  return (
    <>
    
     <div className="nav">
      <div className="routes" ref={disp} onClick={(e)=>{setpage("display");}}>
        Display
      </div>
      <div className="routes" ref={dash} onClick={()=>{setpage("dash")}}>
        Dash
      </div>
    </div> 

    
    {page==="display"?<Display/>:<Dash/>}
    

  
    </>

  )
}

export default Utility

