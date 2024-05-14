
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Vnav'; 
import Prompt from './Prompt';

function Vviewform(){

    const {state} = useLocation();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [isFormIncomplete, setIsFormIncomplete] = useState(true);
    const [message, setMessage] = useState('');
    const [etat, setEtat] = useState([]);
    const[fname, setFname]= useState('');
    const[lname, setLname]= useState('');
    const[cnotes, setCnotes]= useState('');
    const[anotes, setAnotes]= useState('');


    useEffect(() => {
        if (state === null){
            navigate('/svolun')
        }else{
            setAnotes(state.anotes)
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
        navigate('/vsubmittedforms',{state:data})
    }

    const handleMessageChange = event => {

        setMessage(event.target.value);
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

    const handleComplete = (e) => {
        setIsFormIncomplete(false)
        e.persist();
        e.preventDefault();
        const data= {
            formid: state.formid,
            vnotes: message
        }
            if (message === ''){
                axios.post('http://localhost:4000/update-completeform', data )
                .then( res => {
                    alert('Order complete'); 
                    const data= {
                        valid: true
                    } 
                    navigate('/vsubmittedforms',{state:data})              
                })
                .catch((error) => {
                    alert('Error please ask staff for help');
                });
        
            }else{
                axios.post('http://localhost:4000/update-volunteer-notes', data )
                .then( res => {
     
                })
                .catch((error) => {
                    alert('Error please ask staff for help');
                });
    
                axios.post('http://localhost:4000/update-completeform', data )
                .then( res => {
                    alert('Order complete'); 
                    const data= {
                        valid: true
                    } 
                    navigate('/vsubmittedforms',{state:data})           
                })
                .catch((error) => {
                    alert('Error please ask staff for help');
                });
            }


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
        <body >
            <Nav />
            <section class="bg-light text-dark p-5 ">
                <h1 class="text-warning" style={{paddingBottom: '20px'}}>Order</h1>
                <h4>{fname} {lname}</h4>
                <div class="h-100 card-group ">
                
            {
            items.map((item, index) => (
                
                <div class="p-3">

                <div class="card" style={{width: '18rem'}}>
                    <div class="card-body">
                        <h5 class="card-title text-success">{item.itname}</h5>
                        <h6 class="card-text"><span class="text-danger">Selection:</span> {(item.selection ==='')? 'None': item.selection}</h6>
                        <h6 class="card-text"><span class="text-danger">Alternative:</span> {(item.alternative ==='')? 'None': item.alternative}</h6>
                        <h6 class="card-text"><span class="text-danger">Amount:</span> {item.amount}</h6>
                        <form class="needs-validation" onSubmit={(e) => saveAmount(e, index, item.itname )} novalidate>
                                <input type="number" class="form-control" name="amount" id="validationCustom01" onChange={(e) => handleChange(e, index )} placeholder='Actual amount:' aria-label='default input example' required/>
                                <button class="btn btn-danger me-md-2 w-50" type="submit">Edit</button></form>
                                <div style={{paddingRight: '15px', marginTop: '15px'}} >
                            <input class="form-check-input" type="checkbox" id="gridCheck"/>
                            <label class="form-check-label" style={{marginLeft: '20px'}} for="gridCheck">
                                Added
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            ))
            }

            </div>

            <p class="fs-4">Customer notes: {cnotes}</p>
            <p class="fs-4">Admin notes: {anotes}</p>
            <textarea class="form-control "  rows="3"     value={message}   id="notes"  onChange={handleMessageChange} style={{height: '5rem'}} type="text" placeholder="Addtional comments"  name="cnotes" aria-label="default input example"/>
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-secondary w-20" type="button"  onClick={handleComplete} style={{marginTop: '40px'}} >complete</button></div>
                 <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-danger w-20" type="button"  onClick={handleSubmit} style={{marginTop: '40px'}} >Back</button></div>

            </div>
            
            </section>
            <Prompt
       when={isFormIncomplete}
       message="Please do not leave without completing order or ask for assistance" />
        </body>
    );
}

export default Vviewform;