
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 


function Itemsout(){
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const {state} = useLocation();
    useEffect(() => {
        if (state === null){
            navigate('/sadmin')
        }
      }, [state]);
    useEffect( () => {
        fetch('http://localhost:4000/items-out') 
            .then(res => {
                return res.json();
            }).catch((error) => {
                navigate('/adminhome')
            })
            .then(data => {
                setItems(data)
            })
    }, [items]);
    
    const handleSubmit = (e, itnme) => {
        e.persist();
        e.preventDefault();
        const data= {
            itname: itnme,
        }
        navigate('/edititem', {state: data})
    }
    const handleChange = (e, itnme) => {


        const data= {
            itname: itnme
        }
            axios.post('http://localhost:4000/update-itemstatus-to-in', data )
            .then( res => {
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
    }
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
                <h1 class="text-warning" style={{paddingBottom: '30px'}}>Items out of stock</h1>

                <table class="table table-striped ">
               
                <tbody>
                {
            items.map((item, index) => (
                <tr>
                    <td>{item.itname}</td>
                    <td>{item.category}</td>
                    <td>Status: {item.itstatus}</td>
                    <td>Max: {item.max}</td>
                    <td>Desc: {item.description}</td>
                    <td><button type="button" class="btn btn-custom2" onClick={(e) => handleSubmit(e,item.itname)}>Edit </button></td>
                    <td><button type="button" class="btn btn-danger" onClick={(e) => handleChange(e, item.itname)}>Change status</button></td>
                    
                </tr>
                
            ))
            }
            </tbody>
         </table>
            </section>
        </body>
    );
}

export default Itemsout;