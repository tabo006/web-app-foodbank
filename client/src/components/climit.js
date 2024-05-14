import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 

function Climit(){
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const {state} = useLocation();

    useEffect(() => {
        if (state === null){
            navigate('/sadmin')  
        }
      }, [state]);

    useEffect( () => {
        fetch('http://localhost:4000/all-category-limit') 
            .then(res => {
                return res.json();
            }).catch((error) => {

                navigate('/adminhome')
            })
            .then(data => {
                setCategory(data)
            })
    }, [category]);

    const handleSubmit = (e, ctg) => {
        e.persist();
        e.preventDefault();
        const data= {
            cname: ctg
        }
        navigate('/editlimit', {state: data})
    }

    return(
        <body>
            <Nav/>   
            <section class="bg-light text-dark p-5">
            <div class="col"><h1 class="text-warning" style={{paddingBottom: '30px'}}>Category Limit</h1></div>
                <table class="table table-striped ">
               
                <tbody>
                {
            category.map((ctg, index) => (
                <tr>
                    <td><h5>{ctg.category}</h5></td>
                    <td>Individual limit: {ctg.maximum}</td>
                    <td>Family limit: {ctg.maximum_f}</td>
                    <td><button type="button" class="btn btn-danger" onClick={(e) => handleSubmit(e, ctg.category )}>Edit limits</button></td>
                    
                </tr>
                
            ))
            }
            </tbody>
         </table>
            </section>
        </body>
    );
}

export default Climit;