import { GoogleGenerativeAI } from "@google/generative-ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/authcontext';
import {  useRef } from "react";
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import "../styles/gen.css"
const Gen = () => {

    const textRef = useRef(null)
    const keyref = useRef(null)
    const geninp = useRef(null)
    const authtoken = useContext(AuthContext)
    const [genAI,setgenAI] = useState(null)
    const[apiKey ,setApikey] = useState(null)
    const [wait ,setwait]=useState(false)
    const[Genresult,setGenresult] = useState("")
   
    useEffect(()=>{
        
        get_Api_key()
        if(apiKey){

            setgenAI(new GoogleGenerativeAI(apiKey))
            // console.log(apiKey)
        }
        
    },[apiKey])
   
    
   
    function encrypt(Key) {
        return CryptoJS.AES.encrypt(Key, authtoken.authToken).toString();
    }
    function decrypt(cipherKey) {
        const bytes = CryptoJS.AES.decrypt(cipherKey, authtoken.authToken);
        let decrytrd = bytes.toString(CryptoJS.enc.Utf8)
        return decrytrd;
    }
    function get_Api_key(){
        let cookies = document.cookie.split(";")
        let keyword = "API"
        let result = cookies.find(cookie=>cookie.trim().startsWith(keyword))
       
        result?setApikey(decrypt(result.split("=")[1])):null
        
    }
    function store_Api_Key(){
        let key = keyref.current.value.trim().replace(/"/g, '');
        let value = "API="+encrypt(key)+";"
        document.cookie = value
        setApikey(key)
        keyref.current.value=null
    }
    function copyToClipboard() {
        let text = textRef.current.value
        navigator.clipboard.writeText(text).then(function() {

            console.log('Copying to clipboard was successful!');
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
    }

    async function Generate_Text(){
        
        if(apiKey){
            setwait(true)
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
            let prompt = geninp.current.value
            if(prompt.length===0){
                prompt ="hello"
            }
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            setGenresult(text)
            setwait(false)
        }else{
            alert("Add your Google gemni-Pro Api key")
            keyref.current.focus()
        }
    }

  return (
    <>
    <div className="gen-cont">
        {
            apiKey?<>
                    <div className="gen-text-ar-container">
                        <textarea className="gen-text-ar" ref={textRef} value={Genresult} readOnly />
                        <button className="copy-btn" onClick={copyToClipboard}>Copy</button>
                    </div>
            
                    <div className="gen-inp-cont">
                        {wait?<div className="loader"></div>:<></>}
                        <input type="text" placeholder="What is on your mind..." ref={geninp}/>
                        
                        <button onClick={Generate_Text}>Generate</button>
                    </div>
                 </>:
            <div className="api-inp-cont">
                <h2>Use Generative AI</h2>
                <h4>Add Your Api key</h4>
                <input type="password" placeholder="Google Gemini-Pro Api key" ref={keyref} />
                <button onClick={store_Api_Key}>Add</button>
                <h4>See <Link to="/guide">Guide</Link> for more info</h4>
                {/* <h4>Get Your Free Api key</h4>
                <a href="https://ai.google.dev/tutorials/setup">https://ai.google.dev/tutorials/setup</a>
                <p>Its optional you can continue using the app by typing into the Text box bellow. Visit <Link to="/guide">Guide</Link> for more info</p> */}
                {/* <p>Visit <Link to="/guide">Guide</Link> for more info</p> */}
            </div>

        }
        
       
        
    </div>
    </>
  )
}

export default Gen
