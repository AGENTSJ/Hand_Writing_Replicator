import React, { useState } from 'react';
// import Cookies from 'js-cookie';

function LoginForm(props) {
    // console.log(typeof props.props.setLogState);
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
                // Handle server response
                if(data.valid){
                    document.cookie = `token=${data.token};path=/`;
                    props.setLogState(true);
                }
                // Store token in cookies
                
            })
            .catch((error) => {
                
                console.error(error);
            });
    };

    const createUser = (event) => {
        event.preventDefault();

        // Send form details to server using fetch API
        fetch('http://127.0.0.1:5000/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "username":username, "password":password ,"email":email}),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle server response
                console.log(data);
               
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
                email:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <button onClick={loginUser}>Login</button>
            <button onClick={createUser}>Sign up</button>
        </form>
    );
}

export default LoginForm;
