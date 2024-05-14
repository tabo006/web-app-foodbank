import Logo from './foodbank-logo.png';
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

function Nav(){
    const [status, setStatus] = useState([]);
    const [language, setLanguage] =useState()
    const navigate = useNavigate();
    useEffect( () => {
        fetch('http://localhost:4000/fbstatus') 
            .then(res => {
                return res.json();
            })
            .then(data => {
                setStatus(data)
            })
    }, [status]);

    const handleAdd = (e) => {
        navigate('/sadmin')
    }
    const handleVolun = (e) => {
        navigate('/svolun')
    }
    const handleForm = (e) => {
        if(status[0].fbstatus === 'Out of Stock'){
            navigate('/outofstock')
        }else{
            navigate('/policies')
        }
        
    }

    const handleLanguage =(e, lan) => {
        e.persist();
        e.preventDefault();
        if(lan === 'English'){
            setLanguage(false)


        }else{
            setLanguage(true)

        }
    }
    return(
        
        <nav class="navbar navbar-expand-lg bg-dark">
            <div class="container">
            <Link to={language ? '/fhome' : '/'} className="navbar-brand"><img src={Logo} style={{ width: '15%',  marginRight:-40} } alt="Coding Beauty logo"></img></Link>

            <button class="navbar-toggler bg-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
            <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
            <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class= "nav-item ">
                         <button onClick={handleAdd} style={{ color: 'white' }} class="btn btn-custom fs-5">{language ? 'Connexion Admin' : 'Admin Sign-in'}</button>
                        </li>
                        <li class= "nav-item ">
                         <button onClick={handleVolun} style={{ color: 'white' }} class="btn btn-custom fs-5" >{language ? 'Connexion volontaires' : 'Volunteer Sign-in'}</button>
                        </li>
                        <li class= "nav-item">
                         <button onClick={handleForm} style={{ color: 'white' }} class="btn btn-custom fs-5">{language ? 'Commande' : 'Order'}</button>
                        </li>
                        <li class= "nav-item">
                        <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-custom fs-5 dropdown-toggle" style={{color: 'white'}} data-bs-toggle="dropdown" aria-expanded="false">
                                        {language ? 'Langue' : 'Language'}
                                        </button>
                                        <ul class="dropdown-menu text-center">
                                        <button className="btn btn-custom2" onClick={(e) => handleLanguage(e,'French')}>French</button>
                                        <button className="btn btn-custom2" onClick={(e) => handleLanguage(e,'English')}>English</button>
                                        </ul>
                                    </div>
                        </li>
                    </ul>
            </div>
                    
                </div>
            
            
                
            </div>

        </nav>
    );
}

export default Nav; 