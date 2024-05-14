import Nav from "./Nav";
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
function Policies(){
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        const data= {
            valid: true
        }
        navigate('/sclient', {state: data})
    }
    const [status, setStatus] = useState([]);
    useEffect( () => {
        fetch('http://localhost:4000/fbstatus') 
            .then(res => {
                return res.json();
            }).catch((error) => {

            })
            .then(data => {
                setStatus(data)
                if(data[0].fbstatus === 'Out of Stock'){
                    navigate('/outofstock')
                }else{

                }
                
            })
    }, [status]);

    return(
        
        <body>
            <Nav/>
            <section class="bg-light text-dark p-5 ">
                <h1 class="text-warning" > Policies</h1>
                <h3 class="text-center" style={{paddingBottom: '30px'}}>Please read the following before submitting an order</h3>
                <ol>
                    <li class="fs-5"><p>Please <span class="text-danger">click "Add to order" </span>after entering the quantity of each item</p></li>
                    <li class="fs-5"><p>Please <span class="text-danger">click "Update order"</span> after updating the quantity of an item</p></li>
                    <li class="fs-5"><p>Please <span class="text-danger">do not leave form until</span> you have submitted it.</p></li>
                    <li class="fs-5"><p>You can only submit <span class="text-danger">one valid order a day.</span> </p></li>
                    <li class="fs-5"><p>When an item is <span class="text-danger">low in stock</span> please indicate and alternate option for the item in the alternative box</p></li>
                    <li class='fs-5'><p > Please note that submitting your order does not guarantee that you will get everything on your order. We can run out of an item before getting to your order</p></li>
                </ol>
                <button onClick={handleSubmit} class="btn btn-success" style={{width: '30%'}}>Next</button>
            </section>
        </body>
    );
}

export default Policies;