
import {Link} from 'react-router-dom';
import Hnav from './Hnav';
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"; 
import background from './IMG_88614.JPG'

function Home(){
    const navigate = useNavigate();
    const [status, setStatus] = useState([]);
    useEffect( () => {
        fetch('http://localhost:4000/fbstatus') 
            .then(res => {
                return res.json();
            }).catch((error) => {

            })
            .then(data => {
                setStatus(data)
            })
    }, [status]);

    const handleForm = (e) => {
        if(status[0].fbstatus === 'Out of Stock'){
            navigate('/outofstock')
        }else{
            navigate('/policies')
        }
        
    }
    const handleList = (e) => {
        if(status[0].fbstatus === 'Out of Stock'){
            navigate('/outofstock')
        }else{
            navigate('/cinstock')
        }
        
    }
    return(
        <section>
            <Hnav />
            <body>
                <section class="bg-light text-dark p-5 text-center" style={{ backgroundImage: `url(${background})`}}>
                    <h1 class='text-light'>Welcome to the <span class="text">UOSU food bank</span> food order web application.</h1>
                    <section class="p-5">
                        <div class="container">
                            <div class="row text-center">
                                <div class="col-md">
                                    <div class="card text-center">
                                        <h5 class="text-warning card-header">
                                            Order
                                        </h5>
                                        <div class="card-body">

                                            
                                        <button onClick={handleForm}  class="btn btn-danger">Order</button>
                                            <p class="card-text">Click to access order form.</p>
                                            <button onClick={handleList}  class="btn btn-danger">View Stock</button>
                                            <p class="card-text">Click to access see UOSU food bank Policies.</p>
                                           
                                        </div>
                                        <h5 class="card-footer text-warning">
                                            UOSU Food Bank
                                        </h5>
                                    </div>
                                </div>

                                <div class="col-md">
                                    <div class="card text-center">
                                        <h5 class="text-warning card-header">
                                            Accounts
                                        </h5>
                                        <div class="card-body">
                                            <h5 class="card-title">Sign-in</h5>
                                            <Link to="/Sadmin" className="btn btn-danger">Admin Sign-in</Link>
                                            <p class="card-text">Volunteer accounts are already created</p>
                                            <Link to="/Svolun" className="btn btn-danger">Volunteer Sign-in</Link>
                                        </div>
                                        <h5 class="card-footer text-warning">
                                            UOSU Food bank
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </section>
                <section class="bg-secondary-subtle text-dark p-5 text-center">
                    <h3 class='text-warning'>ABOUT</h3>
                    <p>The University of Ottawa Students’ Union (UOSU), in collaboration with the Ottawa Food Bank operates a volunteer-run Food Cupboard at 85 University Private.

Its purpose is to provide emergency food relief to uOttawa students and their families. We also advocate for food security.</p>
                    <h4 class='text-warning' >Opening hours</h4>
                    <p>Monday: 11:00 – 18:00</p>
                    <p>Tuesday: 11:00 – 18:00</p>
                    <p>Wednesday: 13:00 – 18:00</p>
                    <p>Thursday: 11:00 – 18:00</p>
                    <p>Friday: Closed</p>
                    <p>Saturday: Closed</p>
                    <p>Sunday: Closed</p>
                </section>
            </body>
        </section>
    );
}

export default Home;