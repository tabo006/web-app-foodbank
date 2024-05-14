
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './Nav'; 
import axios from 'axios';

function Svolun(){
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const navigate = useNavigate();
    const [pwd, setPwd] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/account-info', {
            params: {
              type: 'Volun'
            } 
        })
        .then(res => {
            setPwd(res.data[0].pwd);
            setUsername(res.data[0].username);
        })
        .catch((error) => {
            alert('errot with server');
        });
      }, [password]);
    const handleEmailChange = event => {

        setEmail(event.target.value);
      }

      
    const handlePasswordChange = event => {

        setPassword(event.target.value);
      }
  

      const handleSubmit = (e) => {
        e.persist();
        e.preventDefault();
        //foodbank-admin@seuo-uosu.ca'
        if (email === username && password === pwd){
            const data= {
                valid: true
            }
            navigate('/volunhome', {state: data})   

        }else{
            alert('wrong password or username')
        }

    }
    return(
        <section>
            <Nav/>
            <body class="bg-light text-dark p-5 text-center">
                <h1 class="text-warning" style={{paddingBottom: '70px'}} >Volunteer sign in page</h1>
                <div class="form-floating mb-3">
                    <input type="email" onChange={handleEmailChange} class="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" onChange={handlePasswordChange}  id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                </div>
                <button class="btn btn-danger  w-50" type="button" onClick={handleSubmit}  style={{marginTop: '40px'}} >Sign-in</button>
            </body>
            
        </section>
    );
}

export default Svolun;