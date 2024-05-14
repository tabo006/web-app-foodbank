
import {Link} from 'react-router-dom';
import Hnav from './Hnav';
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom"; 
import background from './IMG_88614.JPG'

function Fhome(){
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
                    <h1 class='text-light'>Bienvenue sur l'application web de commande de nourriture de <span class="text-">la banque alimentaire de l'UOSU.</span></h1>
                    <section class="p-5">
                        <div class="container">
                            <div class="row text-center">
                                <div class="col-md">
                                    <div class="card text-center">
                                        <h5 class="card-header text-warning">
                                        Commande
                                        </h5>
                                        <div class="card-body">

                                            
                                        <button onClick={handleForm}  class="btn btn-danger">Order</button>
                                            <p class="card-text">Cliquez pour accéder au formulaire de commande de nourriture.</p>
                                            <button onClick={handleList}  class="btn btn-danger">Voir le Stock</button>
                                            <p class="card-text">Cliquez pour accéder aux politiques de la banque alimentaire de l'UOSU.</p>
                                           
                                        </div>
                                        <h5 class="card-footer text-warning">
                                            Banque Alimentaire du SEUO
                                        </h5>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="card text-center">
                                        <h5 class="card-header text-warning">
                                        Comptes
                                        </h5>
                                        <div class="card-body">
                                            <h5 class="card-title">Se Connecter</h5>
                                            <Link to="/Sadmin" className="btn btn-danger">Connexion d'administrateur</Link>
                                            <p class="card-text">Les comptes des volontaires sont déjà créés</p>
                                            <Link to="/Svolun" className="btn btn-danger">Connexion de volontaires</Link>
                                        </div>
                                        <h5 class="card-footer text-warning">
                                        Banque Alimentaire du SEUO
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </section>
                <section class="bg-secondary-subtle text-dark p-5 text-center">
                    <h3 class="text-warning">À PROPOS</h3>
                    <p>L'Union des étudiants de l'Université d'Ottawa (SEUO), en collaboration avec la Banque alimentaire d'Ottawa, gère un service d'aide alimentaire au 85, rue privée de l'Université.

Son objectif est de fournir une aide alimentaire d'urgence aux étudiants de l'Université d'Ottawa et à leurs familles. Nous plaidons également en faveur de la sécurité alimentaire.</p>
                    <h4 class="text-warning">Heures d'ouverture</h4>
                    <p>Lundi : 11h00 - 18h00</p>
                    <p>Mardi: 11h00 – 18h00</p>
                    <p>Mercredi: 13h00 – 18h00</p>
                    <p>Jeudi: 11h00 – 18h00</p>
                    <p>Vendredi: Fermé</p>
                    <p>Samedi: Fermé</p>
                    <p>Dimanche: Fermé</p>
                </section>
            </body>
        </section>
    );
}

export default Fhome;