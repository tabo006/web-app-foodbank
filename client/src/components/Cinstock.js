
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Hnav'; 

function Cinstock(){

    const {state} = useLocation();
    const [items, setItems] = useState([]);


    useEffect( () => {
        fetch('http://localhost:4000/items-in') 
            .then(res => {
                return res.json();
            })
            .then(data => {
                setItems(data)
            })
    }, [items]);

    return(
        <section>
            <Nav />
            <body class="bg-light text-dark p-5 text-center">
            <h1 >List of availbale items</h1>

            
            <div class="h-100 card-group ">
                
            {
            items.map((item, index) => (
                
                <div class="p-3">

                <div class="card" style={{width: '18rem'}}>
                    <div class="card-body">
                        <h5 class="card-title">{item.itname}</h5>
                        <h6 class="card-text">Selection: {item.description}</h6>
                        <p class="card-text text-danger">Limit: {item.max}</p>
                    </div>
                </div>
            </div>
            ))
            }

            </div>
            </body>
        </section>
    );
}

export default  Cinstock;