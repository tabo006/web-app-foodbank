
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 



function Itemsin(){
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const {state} = useLocation();
    useEffect(() => {
        if (state === null){
            navigate('/sadmin')
        }
      }, [state]);
    useEffect( () => {

            fetch('http://localhost:4000/items-in') 
            .then(res => {
                return res.json();
            }).catch((error) => {

                navigate('/adminhome')
            })
            .then(data => {
                setItems(data)
            })
        
    }, [items]);

    const handleChange = (e, itnme) => {
        const data= {
            itname: itnme
        }
            axios.post('http://localhost:4000/update-itemstatus-to-out', data )
            .then( res => {
            })
            .catch((error) => {
                alert('Error please ask errr staff for help');
            });
    }
    const handleLow = (e, itnme) => {
        const data= {
            itname: itnme
        }
            axios.post('http://localhost:4000/update-item-availability-low', data )
            .then( res => {
            })
            .catch((error) => {
                alert('Error please ask errr staff for help');
            });
    }
    const handleHigh = (e, itnme) => {
        const data= {
            itname: itnme
        }
            axios.post('http://localhost:4000/update-item-availability-high', data )
            .then( res => {
            })
            .catch((error) => {
                alert('Error please ask errr staff for help');
            });
    }
    
    return(
        <body>
            <Nav/>
            <section class="bg-light text-dark p-5">
                <h1 class="text-warning" style={{paddingBottom: '30px'}}>Items in stock</h1>
                <table class="table table-striped ">
               
                <tbody>
                {
            items.map((item, index) => (
                <tr>
                    <td><h6>{item.itname}</h6></td>
                    <td>{item.category}</td>
                    <td>Status: {item.itstatus}</td>
                    <td>Max: {item.max}</td>
                    <td>Desc: {item.description}</td>
                    <td>Stock: {item.availability}</td>
                    <td><div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" class="btn btn-warning" onClick={(e) => handleLow(e, item.itname)}>Low</button>
                    <button type="button" class="btn btn-success" onClick={(e) => handleHigh(e, item.itname)}>High</button>
                    <button type="button" class="btn btn-danger" onClick={(e) => handleChange(e, item.itname)}>Out</button>
                    </div></td>
                </tr>
                
            ))
            }
            </tbody>
         </table>
            </section>
        </body>
    );
}

export default Itemsin;