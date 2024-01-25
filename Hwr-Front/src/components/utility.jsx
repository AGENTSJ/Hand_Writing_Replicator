import { useRef } from 'react'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import '../styles/utility.css'

const Utility = () => {
  
  const disp = useRef(null)
  const dash = useRef(null)
  
  function routeDisp(){
    disp.current.click()
  }
  function routeDash(){
    dash.current.click()
  }
  return (
    <>
    
     <div className="nav">
        <div className="routes" onClick={routeDisp}>
          <Link  to="display" ref={disp}>Display</Link>
        </div>
        <div className="routes" onClick={routeDash}>
          <Link  to=""  ref={dash} >Dash</Link>
        </div>
    </div> 

    <Outlet />

  
    </>

  )
}

export default Utility

