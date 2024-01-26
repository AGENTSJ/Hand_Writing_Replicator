import { useRef } from 'react'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import '../styles/utility.css'

const Utility = () => {
  
  const writ = useRef(null)
  const dash = useRef(null)
  const guide = useRef(null)

  function routeWrite(){
    writ.current.click()
  }
  function routeDash(){
    dash.current.click()
  }
  function routeguide(){
    guide.current.click()
  }
  return (
    <>
    
     <div className="nav">
        <div className="routes" onClick={routeguide}>
          <Link  to=""  ref={guide} >Guide</Link>
        </div>
        <div className="routes" onClick={routeWrite}>
          <Link  to="write" ref={writ}>Writer</Link>
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

