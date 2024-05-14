
import Nav from './Vnav'; 
import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";

function Volunhome(){
    const {state} = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (state === null){
            navigate('/svolun')
        }
      }, [state]);

    const handleForms = (e) => {
        const data= {
            valid: true
        }
        navigate('/vsubmittedforms', {state: data})
    }
    return(
        <body>
            <Nav/>
            <section class="bg-light text-dark p-5 text-center">
                <h1 class="text-warning">Volunteer home page</h1>
                <section class="p-5">
                        <div class="container">
                            <div class="row text-center">
                         
                                <div class="col-md">
                                    <div class="card text-center">
                                        <h5 class="card-header text-warning">
                                            Forms
                                        </h5>
                                        <div class="card-body">

                                            <button onClick={handleForms} className="btn btn-danger">Forms</button>
                                       
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
        </body>
    );
}

export default Volunhome;