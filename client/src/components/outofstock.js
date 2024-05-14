import Nav from "./Nav";
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
function Outofstock(){
    const [status, setStatus] = useState([]);
    const navigate = useNavigate();
    useEffect( () => {
        fetch('http://localhost:4000/fbstatus') 
            .then(res => {
                return res.json();
            }).catch((error) => {

            })
            .then(data => {
                setStatus(data)
                if(data[0].fbstatus === 'Out of Stock'){

                }else{
                    navigate('/policies')
                }
                
            })
    }, [status]);
    return(
        <body>
        <Nav />
        <section class="text-dark p-5 text-center">
            <h1 style={{color: 'red'}}>Nous sommes en rupture de stock. / We are out of stock. </h1>
            <h4 >Veuillez suivre le compte instagram de la banque alimentaire ou vous inscrire à notre liste de diffusion pour savoir quand nous serons réapprovisionnés.
                 Please follow the food bank's instagram account or join our email list to know when we will be restocked.</h4>
        </section>
    </body>
    );
}

export default Outofstock;