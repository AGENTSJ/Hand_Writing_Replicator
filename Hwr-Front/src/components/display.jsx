import  { useState } from 'react'
import { useContext ,useEffect} from 'react'
import { AuthContext } from '../context/authcontext'
import { useRef } from 'react'
import'../styles/display.css'

const Display = () => {
  
    const {authToken} = useContext(AuthContext)
    //initialy setting an blank image
    const [img,setimg] = useState("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")
    
    const font_btn = useRef(null)
    const filter_ref = useRef(null)
    const ink_ref = useRef(null)
    let desc = useRef(null)

    useEffect(()=>{
      desc.current.addEventListener("keydown", function(event) {
        
        // allow only letters and whitespaces
        if (event.key === "Enter") {fetchPic()}
        let allowedKeys = /[a-zA-Z0-9\s\n\b]/;
        if (!allowedKeys.test(event.key)) {
         
          event.preventDefault();
        }
      
      });
      // return ()=>{desc.current.removeEventListener("keydown");}
    },[])
    
  async function fetchPic(){
    // console.log(filter_ref.current.value)
    let font_size = font_btn.current.value
      const  response = await fetch("http://127.0.0.1:5000/image/aout",{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':authToken.split('=')[1]
          },
          body:JSON.stringify({"inputstring":desc.current.value,"font_size":font_size,"Filter":filter_ref.current.value,"Ink":ink_ref.current.value})
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
    <div className="backgroundDiv">

      <div className="cont">
        <div className="btncont">
          <button onClick={fetchPic} id="dbtn1" className='gtpicbtn'>Convert</button>
          <button onClick={Download} id="dbtn1" className='gtpicbtn'>Download</button>
        </div>
        <img src={`data:image/png;base64,${img}`} className='image' alt="" />
        <div className="finecont">

          <fieldset>
            <p>Font size</p>
            <input type="number" ref={font_btn} className='fntip' defaultValue={0.5} />
          </fieldset>

          <fieldset>
            <p>Filter</p>
            <input type="color"className='clrip' ref={filter_ref} defaultValue={"#FFFFFF"}  />
          </fieldset>

          <fieldset>
            <p>Ink</p>
            <input type="color" className='clrip' ref={ink_ref} />
          </fieldset>

        </div>
    

      </div>
      
          <textarea className='desc' placeholder='Insert text here' ref={desc}  cols="30" rows="10">
          </textarea>
      
    </div>
    
    </>

  )
}


export default Display

