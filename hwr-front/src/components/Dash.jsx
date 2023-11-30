import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import '../styles/utility.css'
import { useContext } from 'react'
import { AuthContext } from '../context/authcontext';
import '../styles/dash.css'

const Dash = () => {
    const {authToken,setAuthToken} = useContext(AuthContext)
    const uploadbtn = useRef(null)
 
  const inputRef = useRef(null)
  const contref = useRef(null)
  
  useEffect (() => {
   eventListeners()
    fetchUser()
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
  const fetchUser = async ()=>{}
  return (
    <>
    <div className="infocont">
        <label>username</label>
        <input type="text" id="username" className='disabledIP IP'/>
        <label >email</label>
        <input type="email" id="email" className='disabledIP IP'/>
        <button className='updatebtn'>update</button>
    </div>
    <div className="dragndrop" ref={contref}  >
      <label htmlFor="inputfile"></label>
      <input type="file" id="fileInput" ref={inputRef} accept="image/*"/>
      <button className ="disabled" ref={uploadbtn} onClick={uploadImg}>Upload</button>
    </div>
    </>
  )
}

export default Dash