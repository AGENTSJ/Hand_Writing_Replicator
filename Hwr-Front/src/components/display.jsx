import  { useState } from 'react'
import { useContext ,useEffect} from 'react'
import { AuthContext } from '../context/authcontext'
import { useRef } from 'react'
import'../styles/display.css'

const Display = () => {
  
    const {authToken} = useContext(AuthContext)
    //initialy setting an blank image
    const [img,setimg] = useState("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")
    let desc = useRef(null)
    useEffect(()=>{
      desc.current.addEventListener("keydown", function(event) {
        // allow only letters and whitespaces
        if (event.key === "Enter") {fetchPic()}
        let allowedKeys = /[a-zA-Z\s\n\b]/;
        if (!allowedKeys.test(event.key)) {
         
          event.preventDefault();
        }
      
      });
    },[])
    
  async function fetchPic(){
      const  response = await fetch("http://127.0.0.1:5000/image/aout",{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':authToken.split('=')[1]
          },
          body:JSON.stringify({"inputstring":desc.current.value})
        })
        let data = await response.json()
        setimg(data.a4)
        
      }
  function Download(){
    // console.log(img);
    let base64Image = img
    let byteCharacters = atob(base64Image);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], { type: "image/png" }); // Adjust the type based on your image format

   
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);


    link.download = "image.png";
    
    document.body.appendChild(link);

  
    link.click();

 
    document.body.removeChild(link);
  }
   
  return (
    <>
    <div className="dcont">
    <div className="btncont">
      <button onClick={fetchPic} id="dbtn1" className='gtpicbtn'>Convert</button>
      <button onClick={Download} id="dbtn1" className='gtpicbtn'>Download</button>
    </div>
    <img src={`data:image/png;base64,${img}`} className='image' alt="" />
    <textarea className='desc' placeholder='Insert text here' ref={desc}  cols="30" rows="10"></textarea>
    
    </div>
    
    </>

  )
}


export default Display

