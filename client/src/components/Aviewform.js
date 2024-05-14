
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 

function Aviewform(){

    const {state} = useLocation();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const[fname, setFname]= useState('');
    const[lname, setLname]= useState('');
    const[cnotes, setCnotes]= useState('');
    const[anotes, setAnotes]= useState('');


    useEffect(() => {
        if (state === null){
            navigate('/sadmin')
        }else{
            setCnotes(state.cnotes)
            setFname(state.fname)
            setLname(state.lname)
            setAnotes(state.anotes)
            axios.get('http://localhost:4000/formview-items', {
                params: {
                  formid: state.formid
                } 
            })
            .then(res => {
                setItems(res.data);
            })
            .catch((error) => {
                alert('error with server');
            });
        }

      }, [state]);

      const handleSubmit = (e) => {
        const data= {
            valid: true
        }
        navigate('/approvedforms', {state:data})
    }

    const handleUnapprove = (e) => {
        e.persist();
        e.preventDefault();
        const data= {
            formid: state.formid
        }
            axios.post('http://localhost:4000/update-orderdone', data )
            .then( res => {
                const data= {
                    valid: true
                }
               alert('Order Unapproved')
               navigate('/approvedforms', {state: data})
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
    }

    return(
        <body >
            <Nav />
            <section class="bg-light text-dark p-5 ">
                <h1 class="text-warning" style={{paddingBottom: '20px'}}>Order</h1>
                <h4>{fname} {lname}</h4>
            <table class="table table-striped ">
                <tbody>
                     {
                    items.map((item, index) => (
                        <tr>
                            <td>{item.itname}</td>
                            <td>Amount: {item.amount}</td>
                            <td><h6>Selection:</h6> {(item.selection ==='')? 'None': item.selection}</td>
                            <td><h6>Alternative:</h6> {(item.alternative ==='')? 'None': item.alternative}</td>
                            
                        </tr>
                    
                        
                    ))
                    }
                </tbody>
           
            </table>
            <p class="fs-4">Customer notes: {cnotes}</p>
            <p class="fs-4">Admin notes: {anotes}</p>
            
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">

                 <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-secondary w-20" type="button"  onClick={handleSubmit} style={{marginTop: '40px'}} >Back</button></div>
                 <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-danger w-20" type="button"  onClick={handleUnapprove} style={{marginTop: '40px'}} >Unapprove</button></div>
            </div>

            </section>
            
        </body>
    );
}

export default Aviewform;