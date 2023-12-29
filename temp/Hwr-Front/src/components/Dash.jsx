import { useEffect, useState } from 'react'
import { useRef } from 'react'
import '../styles/utility.css'
import { useContext } from 'react'
import { AuthContext } from '../context/authcontext';
import '../styles/dash.css'

const Dash = () => {
    const {authToken} = useContext(AuthContext)
    const uploadbtn = useRef(null)
    const [missing,setmissing] = useState([])

  const inputRef = useRef(null)
  const contref = useRef(null)
  const usrname = useRef(null)
  const email = useRef(null)

  useEffect (() => {
    // console.log(authToken);
   eventListeners()
   fetchUser()
   fetchMissing()

    }, [])

  const eventListeners = ()=>{
    contref.current.addEventListener('dragover', handledragover)
    contref.current.addEventListener('drop', handledrop)
    contref.current.addEventListener('dragleave', handledragleave)

    inputRef.current.addEventListener('change', handlechange)
  }
  const handledragover = (e) => {
    e.preventDefault()
    contref.current.classList.add('highlight')
  }
  const handledrop =()=>{
    contref.current.classList.remove('highlight')
  }
  const handledragleave =()=>{  
    contref.current.classList.remove('highlight')
  }
  const handlechange = async (e) => { 
    
    let file = e.target.files[0]
    if (file.type.match('image.*') == null) {
      alert('not an image')
    }else{
      uploadbtn.current.classList.remove('disabled')
      uploadbtn.current.classList.add('enabled')
      convertToBase64(file)
    }
    
  }
  const uploadImg = async ()=>{

    let file = inputRef.current.files[0]
    let base64str = await convertToBase64(file)
    

    let response = await fetch('http://127.0.0.1:5000/image/upload',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':authToken.split('=')[1]
        },
        body:JSON.stringify({'image':base64str})
      })
      let data = await response.json()
      console.log(data);
  }
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
    // console.log(result);
    setmissing(missing_alph)
  }

  function Miss(props){
    return(
      
      <div className="missing">
        Uh oh i think there are some missing letters
        <br/>
          {/* eslint-disable-next-line react/prop-types */}
        {props.alph.map((item)=>{ item=item+" , ";return(item)})}

      </div>
    )
  }
  function logout(){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload()
  }
  return (
    <>
    <div className="infocont">
        <label>username</label>
        <input type="text" id="username" className='disabledIP IP' ref={usrname}/>
        <label >email</label>
        <input type="email" id="email" className='disabledIP IP' ref={email}/>
    </div>
    {
      missing.length>0?<Miss alph={missing}/>:<div></div>
    }
    <div className="dragndrop" ref={contref}  >
      <br />

      <div className="assert">
      Add your handwrittings here
      </div>
      <br />
      <input type="file" className='choosefile' ref={inputRef} accept="image/*"/>
      

      <button className ="disabled uploadbtn" ref={uploadbtn} onClick={uploadImg}>Upload</button>
      <button onClick={logout} className='lgbtn'>Log Out</button>
    </div>
    
    
    </>
  )
}

export default Dash