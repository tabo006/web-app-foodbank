import Logo from './foodbank-logo.png';
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

function Anav(){
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
    const handleHome = (e) => {
        const data ={
            valid: true
        }
        navigate('/adminhome', {state: data})
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
        
    const handleAllforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/allforms', {state: data})
    }
    const handleSubmittedforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/submittedforms', {state: data})
    }
    const handleApprovedforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/approvedforms', {state: data})
    }
    const handleActiveforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/activeforms', {state: data})
    }
    const handleCompletedforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/completedforms', {state: data})
    }
    const handleIncompleteforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/incompleteforms', {state: data})
    }
    const handleLoggedforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/loggedforms', {state: data})
    }
    const handleAllitems = (e) => {
        const data= {
            valid: true
        }
        navigate('/allitems', {state: data})
    }
    const handleItemsin = (e) => {
        const data= {
            valid: true
        }
        navigate('/itemsin', {state: data})
    }
    const handleItemsout = (e) => {
        const data= {
            valid: true
        }
        navigate('/itemsout', {state: data})
    }
    const handleAdditem = (e) => {
        const data= {
            valid: true
        }
        navigate('/additem', {state: data})
    }
    const handleCategory = (e) => {
        const data= {
            valid: true
        }
        navigate('/climit', {state: data})
    }
    return(
        
        <nav class="navbar navbar-expand-lg bg-dark">
            <div class="container">
            <Link to={language ? '/fhome' : '/'} className="navbar-brand"><img src={Logo} style={{ width: '15%', marginRight:-40}} alt="Coding Beauty logo"></img></Link>

            <button class="navbar-toggler bg-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
            <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
            <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class= "nav-item ">
                         <button onClick={handleHome} style={{ color: 'white' }} class="btn btn-custom fs-6">{language ? 'Accueil admin' : 'Admin home'}</button>
                        </li>
                        <li class= "nav-item ">
                         <button onClick={handleAdd} style={{ color: 'white' }} class="btn btn-custom fs-6">{language ? 'Connexion Admin' : 'Admin Sign-in'}</button>
                        </li>
                        <li class= "nav-item ">
                         <button onClick={handleVolun} style={{ color: 'white' }} class="btn btn-custom fs-6" >{language ? 'Connexion volontaires' : 'Volunteer Sign-in'}</button>
                        </li>
                        <li class= "nav-item">
                         <button onClick={handleForm} style={{ color: 'white' }} class="btn btn-custom fs-6">{language ? 'Commande' : 'Order'}</button>
                        </li>
                        <li class= "nav-item">
                        <div class="btn-group" role="group">
                                        <button type="button" style={{color: 'white'}} class="btn btn-custom fs-6 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {language ? 'Articles' : 'Items'}
                                        </button>
                                        <ul class="dropdown-menu text-center">
                                        <button onClick={handleAllitems} className="btn btn-custom2">All Items</button>
                                            <button onClick={handleItemsin} className="btn btn-custom2">Items In stock</button>
                                            <button onClick={handleItemsout} className="btn btn-custom2">Items Out of stock</button>
                                            <button onClick={handleAdditem} className="btn btn-custom2" >Add Item</button>
                                            <button onClick={handleCategory} className="btn btn-custom2">Category Limits</button>

                                        </ul>
                                    </div>
                        </li>
                        <li class= "nav-item">
                        <div class="btn-group" role="group">
                                        <button type="button" style={{color: 'white'}} class="btn btn-custom dropdown-toggle fs-6" data-bs-toggle="dropdown" aria-expanded="false">
                                        {language ? 'Formulaire' : 'Forms'}
                                        </button>
                                        <ul class="dropdown-menu text-center">
                                        <button className="btn btn-custom2" onClick={handleAllforms}>All Forms</button>
                                                <button  className="btn btn-custom2" onClick={handleSubmittedforms}>Submitted Forms</button>
                                               <button  className="btn btn-custom2" onClick={handleApprovedforms}>Approved Forms</button>
                                                <button  className="btn btn-custom2" onClick={handleActiveforms}>Active Forms</button>
                                                <button  className="btn btn-custom2" onClick={handleCompletedforms}>Completed Forms</button>
                                               <button  className="btn btn-custom2" onClick={handleIncompleteforms}>Incomplete Forms</button>
                                                <button className="btn btn-custom2" onClick={handleLoggedforms}>Logged Forms</button>

                                        </ul>
                                    </div>
        
                        </li>
                        <li class= "nav-item">
                        <div class="btn-group" role="group">
                                        <button type="button" class="btn fs-6 btn-custom dropdown-toggle" style={{color: 'white'}} data-bs-toggle="dropdown" aria-expanded="false">
                                        {language ? 'Langue' : 'Language'}
                                        </button>
                                        <ul class="dropdown-menu text-center">
                                        <li><button className="btn btn-custom2" onClick={(e) => handleLanguage(e,'French')}>French</button></li>
                                        <li><button className="btn btn-custom2" onClick={(e) => handleLanguage(e,'English')}>English</button></li>
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

export default Anav; 