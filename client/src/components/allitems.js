
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 


function Allitems(){
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const {state} = useLocation();
    useEffect(() => {
        if (state === null){
            navigate('/sadmin')
        }
      }, [state]);
    useEffect( () => {
        fetch('http://localhost:4000/items') 
            .then(res => {
                return res.json();
            }).catch((error) => {

                navigate('/adminhome')
            })
            .then(data => {
                setItems(data)
            })
    }, [items]);
    
    const handleBack = (e) => {
        const data= {
            valid: true
        }
        navigate('/adminhome', {state: data})
    }
    
    return(
        <body>
            <Nav/>
            <section class="bg-light text-dark p-5">
                <h1 class="text-warning" style={{paddingBottom: '30px'}}>All items</h1>
                <table class="table table-striped ">
               
                <tbody>
                {
            items.map((item, index) => (
                <tr>
                    <td>{item.itname}</td>
                    <td>Category: {item.category}</td>
                    <td>Status: {item.itstatus}</td>
                    <td>Max: {item.max}</td>
                    <td>Description: {item.description}</td>

                    
                </tr>
                
            ))
            }
            </tbody>
         </table>
            </section>
        </body>
    );
}

export default Allitems;

