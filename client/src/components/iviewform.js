
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 


function Iviewform(){

    const {state} = useLocation();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const[fname, setFname]= useState('');
    const[lname, setLname]= useState('');

    useEffect(() => {
        if (state === null){
            navigate('/sadmin')
        }else{
            setFname(state.fname)
            setLname(state.lname)
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
        navigate('/incompleteforms', {state: data})
    }

    const handleDelete = (e) => {
        e.persist();
        e.preventDefault();
        const data= {
            formid: state.formid
        }
            axios.post('http://localhost:4000/update-deleteform', data )
            .then( res => {
                const data= {
                    valid: true
                }
               alert('Order deleted')
               navigate('/incompleteforms', {state:data})
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
                        </tr>
                    
                        
                    ))
                    }
                </tbody>
           
            </table>
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-secondary w-50" type="button"  onClick={handleSubmit} style={{marginTop: '40px'}} >Back</button></div>
                 <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-danger w-50" type="button"  onClick={handleDelete} style={{marginTop: '40px'}} >Delete</button></div>
                
            </div>
            </section>
            
        </body>
    );
}

export default Iviewform;