import { useRef } from 'react'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import '../styles/utility.css'

const Utility = () => {
  
  const disp = useRef(null)
  const dash = useRef(null)
  
  function routeDisp(){
    dash.current.parentElement.style.backgroundColor="rgb(129, 129, 235)"
    disp.current.click()
    disp.current.parentElement.style.backgroundColor="rgb(112, 112, 243)"
  }
  function routeDash(){
    disp.current.parentElement.style.backgroundColor="rgb(129, 129, 235)"
    dash.current.click()
    dash.current.parentElement.style.backgroundColor="rgb(112, 112, 243)"
  }
  return (
    <>
    
     <div className="nav">
        <div className="routes" onClick={routeDisp}>
          <Link  to="" ref={disp}>Display</Link>
        </div>
        <div className="routes" onClick={routeDash}>
          <Link  to="dash"  ref={dash} >Dash</Link>
        </div>
    </div> 

    <Outlet />

  
    </>

  )
}

export default Utility

