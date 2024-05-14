
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Nav'; 
import Prompt from './Prompt';

function Form(){

    const [isFormIncomplete, setIsFormIncomplete] = useState(true);
    const {state} = useLocation();
    const navigate = useNavigate();
    const {  fnme, lnme, family} = state;
    const [change, setChange] = useState([]);
    const [etat, setEtat] = useState([]);
    const [items, setItems] = useState([]);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const unloadCallback = (event) => {
          event.preventDefault();
          event.returnValue = "";
          return "";
        };
      
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
      }, []);

    useEffect( () => {
        fetch('http://localhost:4000/items-in') 
            .then(res => {
                return res.json();
            })
            .then(data => {
                setItems(data)
            })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/formid', {
            params: {
              fnme: fnme,
              lnme: lnme
            } 
        })
        .then(res => {
            setData(res.data);
        })
        .catch((error) => {
            alert('errror');
        });
      }, []);

      var first = data[0];

    const handleSubmit = (e) => {
        e.persist();
        e.preventDefault();
        const data= {
            formid: first.formid,
            cnotes: message
        }
        
        if (message === ''){
            setIsFormIncomplete(false)
            axios.post('http://localhost:4000/update-orderdone', data )
            .then( res => {
                alert('form submitted');  
                navigate('/ordervalid')              
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
    
        }else{
            setIsFormIncomplete(false)
            axios.post('http://localhost:4000/update-customer-notes', data )
            .then( res => {
               console.log('Done submitting')       
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });

            axios.post('http://localhost:4000/update-orderdone', data )
            .then( res => {
                alert('form submitted');  
                navigate('/ordervalid')              
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
        }

    }
    const [max, setMax] = useState(0);
    const handleItem = (e, itname, itmax , index) => {
        e.persist();
        e.preventDefault();
        setMax(itmax)
        if(family){
          setMax(itmax *2)
        }

        if (etat[index].quantity > max || etat[index].quantity < 0){
            alert('Quantity invalid')
       } else{

            if(change[index].chg === false){
                const data= {
                    itname:  itname,
                    formid: first.formid,
                    amount: etat[index].quantity,
                }
        
                axios.post('http://localhost:4000/add-formitem', data )
                .then( res => {

                    const newChange = [...change];
                    newChange[index] = {
                   ...newChange[index],
                     ['chg']: true
                      };
                      setChange(newChange);
                
                })
                .catch((error) => {
                    alert('Error please ask staff for help');
                });
            }else{
                const data= {
                    itname:  itname,
                    formid: first.formid,
                    amount: etat[index].quantity,
                }
        
                axios.post('http://localhost:4000/update-items', data )
                .then( res => {
             
                })
                .catch((error) => {
                    alert('Error please ask staff for help');
                });
            }

       }


    }

    const handleChange = (e, i) => {

        if(etat[i] === undefined){
            const newChange = [...change];
            newChange[i] = {
           ...newChange[i],
             ['chg']: false
              };
              setChange(newChange);

        }
        e.persist();
      const newEtat = [...etat];
      newEtat[i] = {
        ...newEtat[i],
        [e.target.name]: e.target.value
      };
      setEtat(newEtat);
    }
  
 

    const handleMessageChange = event => {

      setMessage(event.target.value);
    }

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
                    <form class="needs-validation"  onSubmit={(e) => handleItem(e,item.itname, item.max, index)} novalidate>
                        <h5 class="card-title">{item.itname}</h5>
                        <p class="card-text">Category: {item.category}</p>
                        <h6 class="card-text">Selection: {item.description}</h6>
                        <input class="form-control" type="number" placeholder="Quantity"  name="quantity" onChange={(e) => handleChange(e, index )} aria-label="default input example" required />
                        <p class="card-text text-danger">Limit: {family ? (  item.max * 2) : (item.max)}</p>
                        <button type="submit" class="btn btn-secondary" >Add to form</button>
                        </form>
                    </div>
                </div>
            </div>
            ))
            }

            </div>
            <textarea class="form-control "  rows="3"        id="notes"  onChange={handleMessageChange} style={{height: '5rem'}} type="text" placeholder="Addtional comments"  name="cnotes" aria-label="default input example"/>

            <button type="button" className="btn btn-secondary m-3" onClick={handleSubmit} >Done</button>

            </body>
            <Prompt
       when={isFormIncomplete}
       message="Are you sure you want to leave?" />
        </section>
    );
}

export default Form;