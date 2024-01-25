/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/authcontext';
import "../styles/login.css"

function LoginForm(props) {
    const {setAuthToken} = useContext(AuthContext)
    
    props = props.props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {  
        setEmail(event.target.value);
    }
    
    const loginUser = (event) => {
        event.preventDefault();

        // Send form details to server using fetch API
        fetch('http://127.0.0.1:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "username":username, "password":password ,"email":email}),
        })
            .then((response) => response.json())
            .then((data) => {
           
                if(data.valid){
                    document.cookie = `token=${data.token};path=/`;
                    props.setLogState(true);
                    setAuthToken(`token=${data.token}`)
                }
           
                
            })
            .catch((error) => {
                
                console.error(error);
            });
    };

    const createUser = (event) => {
        event.preventDefault();

        if(username.length>5){

            fetch('http://127.0.0.1:5000/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "username":username, "password":password ,"email":email}),
            })
                .then((response) => response.json())
                .then((res) => {
                    // console.log(res)
                    if(res.status===1){
                        
                        alert("User created Login")
                        window.location.reload()
                    }else{
                        alert(`cannot create user ${res.error}`)
                    }
                    
                    
                   
                })
                .catch((error) => {
                    console.error(error);
                });
        }else{
            alert("short username")
        }
    };

    return (
        <div className='logincont'>
            
            <form className='frm'>
            <div className="HWRlegend"></div>

                <div className="wlcmcont">
                    <p>
                        Embrace your uniqueness
                    </p>
                </div>
                <label className='lbl'>
                    Username:
                    <br/>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label className='lbl'>
                    email
                    <br/>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label className='lbl'>
                    Password:
                    <br/>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <div className="logbtncont">

                    <button className='logbtn' onClick={loginUser}>Login</button>
                    <button className='logbtn' onClick={createUser}>Sign up</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
