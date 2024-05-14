
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 


function Sviewform(){

    const {state} = useLocation();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [etat, setEtat] = useState([]);

    const[fname, setFname]= useState('');
    const[lname, setLname]= useState('');
    const[cnotes, setCnotes]= useState('');


    useEffect(() => {
        if (state === null){
            navigate('/sadmin')
        }else{
            setCnotes(state.cnotes)
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
        navigate('/submittedforms', {state: data})
    }
    const saveAmount = (e, i, itnme)  => {
        e.persist();
        e.preventDefault();
        if(etat[i].amount < 0){
            alert('Number should be positif')
        }else{

            const data= {
                itname:  itnme,
                formid: state.formid,
                amountchg: etat[i].amount,
            }
            axios.post('http://localhost:4000/update-formitem-amount', data )
            .then( res => {
                window.location.reload();
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
        }

           
      }
    const handleApprove = (e) => {
        e.persist();
        e.preventDefault();
        const data= {
            formid: state.formid,
            anotes: message
        }
            if (message === ''){

                axios.post('http://localhost:4000/update-approveform', data )
                .then( res => {
                    const data= {
                        valid: true
                    }
                    alert('form approved');  
                    navigate('/submittedforms',{state:data})              
                })
                .catch((error) => {
                    alert('Error please ask staff for help');
                });
        
            }else{

                axios.post('http://localhost:4000/update-admin-notes', data )
                .then( res => {
   
                })
                .catch((error) => {
                    alert('Error please ask staff for help');
                });
    
                axios.post('http://localhost:4000/update-approveform', data )
                .then( res => {
                    const data= {
                        valid: true
                    }
                    alert('Order approved')
               navigate('/submittedforms',{state:data})        
                })
                .catch((error) => {
                    alert('Error please ask staff for help');
                });
            }
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
               navigate('/submittedforms',{state:data})
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
    }
    const handleMessageChange = event => {

        setMessage(event.target.value);
      }
      const handleChange = (e, i) => {
        e.persist();
      const newEtat = [...etat];
      newEtat[i] = {
        ...newEtat[i],
        [e.target.name]: e.target.value
      };
      setEtat(newEtat);
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
                            <td><h7>Amount:</h7> {item.amount}</td>
                            <td><h6>Selection:</h6> {(item.selection ==='')? 'None': item.selection}</td>
                            <td><h6>Alternative:</h6> {(item.alternative ==='')? 'None': item.alternative}</td>
                            <td><form class="needs-validation" onSubmit={(e) => saveAmount(e, index, item.itname )} novalidate>
                                <input type="number" class="form-control" name="amount" id="validationCustom01" onChange={(e) => handleChange(e, index )} placeholder='New amount:' aria-label='default input example' required/>
                                <button class="btn btn-danger me-md-2 w-50" type="submit">Edit</button></form></td>

                        </tr>
                    
                        
                    ))
                    }
                </tbody>
           
            </table>
            <p class="fs-4">Customer notes: {cnotes}</p>
            <textarea class="form-control "  rows="3"        id="notes"  onChange={handleMessageChange} style={{height: '5rem'}} type="text" placeholder="Addtional comments"  name="cnotes" aria-label="default input example"/>
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                 <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-success w-20" type="button"  onClick={handleApprove} style={{marginTop: '40px'}} >Approve</button></div>
                 <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-secondary w-20" type="button"  onClick={handleSubmit} style={{marginTop: '40px'}} >Back</button></div>
                 <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-danger w-20" type="button"  onClick={handleDelete} style={{marginTop: '40px'}} >Delete</button></div>
            </div>

            </section>
            
        </body>
    );
}

export default Sviewform;