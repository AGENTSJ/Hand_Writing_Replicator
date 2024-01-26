import { useEffect, useState } from 'react'
import { useRef } from 'react'
import '../styles/utility.css'
import { useContext } from 'react'
import { AuthContext } from '../context/authcontext';
import '../styles/dash.css'

function Miss(props){
    
  let text = "Uh oh i think we are missing some missing characters upload your handwriting"
  let text2 =" Note: Follow instructions in guide"
  /* eslint-disable react/prop-types */
  if(props.alph.length===62){
    text = "Try uploading your handwriting bellow click on guide for more info"
    
  }else if(props.alph.length==0){
    text = "We have all the needed characters. But adding more will give you variety in your creation"
  }
  return(
    
    <div className="missing">
      <p>{text}</p>
      
      {props.alph.length===62?"":<p>{props.alph.join(' , ')}</p>}
      <p>{text2}</p>

    </div>
  )
}
function Loading(){

  return(
    <>
    <div className="loader"></div>
    </>
  )
}
function UploadButton(props){

  {/* eslint-disable react/prop-types */}
  const {authToken} = useContext(AuthContext)
  const[waiting,setwaiting]= useState(false)
  const buttonref = useRef(null)
  const inputref = useRef(null)
  const [para,setpara] = useState("Click to select an image")
  useEffect(()=>{
    inputref.current.addEventListener('change', handlebuttonchange)
  },[])

  const convertToBase64 = (file) => {
    
    return new Promise((resolve,reject)=>{

      if(file.type.match('image.*') == null){
      
      reject('error')
      
      }else{

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {

          
          resolve(reader.result)
        }
        reader.onerror = (error) => {
          console.log('error in converttobase64');
          reject(error)
        }
      }


    })
  }
  const handlebuttonchange = async (e) => { 
    
    let file = e.target.files[0]
    if (file.type.match('image.*') == null) {
      alert('not an image')
    }else{
      buttonref.current.classList.remove('disabled')
      buttonref.current.classList.add('enabled')
      convertToBase64(file)
    }
    setpara(file.name)
    // let lbl= inputref.current.parentNode
    // lbl.innerText = file.name

    
  }
  const uploadImg = async (STATE,inpref)=>{
    setwaiting(true)
    let file = inpref.current.files[0]
    let base64str = await convertToBase64(file)
    

    let response = await fetch('http://127.0.0.1:5000/image/upload',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':authToken.split('=')[1]
        },
        body:JSON.stringify({'image':base64str,'STATE':STATE})
      })
      let data = await response.json()
      console.log(data);
      setwaiting(false)
      inputref.current.value=null
  }
  let text = ""
  
  props.STATE===0?text = "Capital Letter":props.STATE===1?text="Small letter":props.STATE===2?text="Digits":""
  
  return(
    <>
      <label className='choosefile-label'>
        {para}
        <input type="file" className='choosefile' ref={inputref} accept="image/*"/>
      </label>
      {waiting?<Loading/>:<button className ="disabled uploadbtn" ref={buttonref} onClick={()=>uploadImg(props.STATE,inputref)}>Upload {text}</button>}
    </>
  )
}

const Dash = () => {
  const {authToken} = useContext(AuthContext)
  
  const [missing,setmissing] = useState([])

  const contref = useRef(null)
  const usrname = useRef(null)
  const email = useRef(null)

  useEffect (() => {
   fetchUser()
   fetchMissing()
    }, [])



  const fetchUser = async ()=>{
    
    let response = await fetch("http://127.0.0.1:5000/user/profile",{
      metheod:"GET",
      headers:{
        'Content-Type':'application/json',
        'Authorization':authToken.split('=')[1]
      }
    })
    let result = await response.json()
    usrname.current.value = result.username
    email.current.value = result.email

  }
  const fetchMissing = async ()=>{
    let response = await fetch("http://127.0.0.1:5000/image/getstatus",{
      metheod:"GET",
      headers:{
        'Content-Type':'application/json',
        'Authorization':authToken.split('=')[1]
      }

    })
    let result = await response.json()

    const missing_alph = result[0].missing_alph
    setmissing(missing_alph)
  }
  function logout(){
    document.cookie = "API=;"
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload()
  }
  
  return (
    <>
    <div className="dashdiv backgroundDiv">
      <div className="dcont">

        <div className="HWRlegend"></div>

        <div className="infocont">
            <div className="subinfo">
              <p>User name</p>
              <input type="text" id="username" className='disabledIP IP' ref={usrname}/>
            </div>
            <div className="subinfo">
              <p >email</p>
              <input type="email" id="email" className='disabledIP IP' ref={email}/>
            </div>
            <button onClick={logout} className='lgbtn'>Log Out</button>
        </div>
        
        <fieldset>
          <legend><label>Upload</label></legend>
          <Miss alph={missing}/>
          
          <div className="dragndrop" ref={contref}  >

            <div className="assert">
              Add your handwrittings here
            </div>

            <UploadButton  STATE={0}/>
            <UploadButton  STATE={1}/>
            <UploadButton  STATE={2}/>
           
            </div>
            <h4 className='credit'>Created by <a target='blank' href="https://www.linkedin.com/in/abhijith-sj-89031a243/">Abhijith sj</a> </h4>
           
        </fieldset>
        
      </div>
    </div>
    {/* <Loading/> */}
    </>
  )
}

export default Dash