
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Nav'; 
import Prompt from './Prompt';



function Formfruits(){
    const [isFormIncomplete, setIsFormIncomplete] = useState(true);
    const {state} = useLocation();
    const navigate = useNavigate();
    const [change, setChange] = useState([]);
    const [etat, setEtat] = useState([]);
    const [notes, setNotes] = useState([]);
    const [items, setItems] = useState([]);
    const [data, setData] = useState([]);
    const [alternative, setAlternative]= useState([])
    const[empty, setEmpty]=useState(false)
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState([]);
    const [maximum, setMaximum]= useState(0)
    const [maximumf, setMaximumf]= useState(0)

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
        axios.get('http://localhost:4000/items-category',{
            params: {
              category: 'Fruit'
            } 
        })
            .then(res => {
                setItems(res.data);
                if(res.data.length === 0){
                    setEmpty(true)
                }else{
                    setEmpty(false)
                }
            })
            .catch((error) => {

                alert('errror');
                navigate('/sclient')
            });
          }, [items]);

    useEffect( () => {
        axios.get('http://localhost:4000/category-limit',{
            params: {
              cname: 'Fruits'
            } 
        }).then(res => {
            setCategory(res.data)
            setMaximum(res.data[0].maximum)
            setMaximumf(res.data[0].maximum_f)


            })
        .catch((error) => {
    
                    navigate('/policies')
                })
        
        }, [category]);

    useEffect(() => {
        if (state === null){
            navigate('/sclient')
        }else{
            axios.get('http://localhost:4000/formid', {
                params: {
                  fnme: state.fnme,
                  lnme: state.lnme,
                  date: state.fdate
                } 
                
            })
            .then(res => {
                setData(res.data);
            })
            .catch((error) => {
                navigate('/sclient')
                alert('errror');
            });
        }

      }, [state]);

      useEffect(() => {
            if (!isFormIncomplete) {
                const data= {
                    formid: first.formid,
                    cnotes: message,
                    fnme: state.fnme,
                    lnme: state.lnme,
                    family: state.family,
                }
            navigate('/formvegetables', {state: data})
            }
        

      }, [isFormIncomplete]);

      var first = data[0];

    const handleSubmit = async (e) => {
        
        e.persist();
        e.preventDefault();
        
        axios.get('http://localhost:4000/total-category', {
            params: {
              formid: first.formid,
              category: 'Fruit'
            } 
        }) 
        .then( res => {
            if(state.family){
                if(res.data[0].sum > maximumf){
                    alert('Reduce total quantity by updating form')
                }else{
                    setIsFormIncomplete(false);
                }
                
            }else{
                if(res.data[0].sum > category[0].maximum){
                    alert('Reduce total quantity by updating form')
                }else{
                    setIsFormIncomplete(false)
                }
            }   
        })
        .catch((error) => {
            alert('Error please ask staff for help');
        });


        
        


    }
    const handleItem =(e, itname, itmax , index) => {
        e.persist();
        e.preventDefault();
        // check if we are updating to 0
        if(parseInt(etat[index].quantity) === 0){
            const data1 ={
                formid: first.formid,
                itname: itname
            }

            axios.post('http://localhost:4000/update-deleteformitem-0', data1 )
                        .then( res => {
        
                            const newChange = [...change];
                            newChange[index] = {
                           ...newChange[index],
                             ['chg']: false
                              };
                              setChange(newChange);
                        
                        })
                        .catch((error) => {
                            alert('Error please ask staff for help');
                        });
        }else{
            //family check
            if(state.family){
                if (etat[index].quantity > (itmax * 2) || etat[index].quantity < 0){
                    alert('Quantity invalid')
                    //check if we are adding an item and not updating it 
               } else{
                    if(change[index].chg === false && notes[index] !== undefined && alternative[index] !== undefined){
                        const data= {
                            itname:  itname,
                            formid: first.formid,
                            amount: etat[index].quantity,
                            selection: notes[index].choice,
                            alternative: alternative[index].alt
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
                        if(change[index].chg === false && notes[index] !== undefined && alternative[index] === undefined){
                            const data= {
                                itname:  itname,
                                formid: first.formid,
                                amount: etat[index].quantity,
                                selection: notes[index].choice,
                                alternative: ''
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
                            if(change[index].chg === false && notes[index] === undefined && alternative[index] !== undefined){
                            const data= {
                                itname:  itname,
                                formid: first.formid,
                                amount: etat[index].quantity,
                                selection: '',
                                alternative: alternative[index].alt
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
                                if(change[index].chg === false && notes[index] === undefined && alternative[index] === undefined){
                                    const data= {
                                        itname:  itname,
                                        formid: first.formid,
                                        amount: etat[index].quantity,
                                        selection: '',
                                        alternative: ''
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
                                    //in cases below we are updating items and not adding new ones
                                }else{
                                    if(change[index].chg === true && notes[index] === undefined && alternative[index] !== undefined){
                                        const data= {
                                            itname:  itname,
                                            formid: first.formid,
                                            amount: etat[index].quantity,
                                            alternative: alternative[index].alt
                                        }
                                        
                                        axios.post('http://localhost:4000/update-items', data )
                                        .then( res => {
                                     
                                        })
                                        .catch((error) => {
                                            alert('Error please ask staff for help');
                                        });

                                        axios.post('http://localhost:4000/update-formitem-alt', data )
                                        .then( res => {
                                     
                                        })
                                        .catch((error) => {
                                            alert('Error please ask staff for help');
                                        });
                                    
                                    }else{
                                        if(change[index].chg === true && notes[index] === undefined && alternative[index] === undefined){
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
                                        }else{
                                            if(change[index].chg === true && notes[index] !== undefined && alternative[index] !== undefined){
                                                const data= {
                                                    itname:  itname,
                                                    formid: first.formid,
                                                    amount: etat[index].quantity,
                                                    selection: notes[index].choice,
                                                    alternative: alternative[index].alt
                                                }
                                        
                                                axios.post('http://localhost:4000/update-items', data )
                                                .then( res => {
                                            
                                                })
                                                .catch((error) => {
                                                    alert('Error please ask staff for help');
                                                });
                                                axios.post('http://localhost:4000/update-item-note', data )
                                                .then( res => {
                                            
                                                })
                                                .catch((error) => {
                                                    alert('Error please ask staff for help');
                                                });
                                                axios.post('http://localhost:4000/update-formitem-alt', data )
                                                .then( res => {
                                            
                                                })
                                                .catch((error) => {
                                                    alert('Error please ask staff for help');
                                                });
                                            }else{
                                                const data= {
                                                    itname:  itname,
                                                    formid: first.formid,
                                                    amount: etat[index].quantity,
                                                    selection: notes[index].choice,
                                                }
                                                axios.post('http://localhost:4000/update-items', data )
                                                .then( res => {
                                            
                                                })
                                                .catch((error) => {
                                                    alert('Error please ask staff for help');
                                                });
                                                axios.post('http://localhost:4000/update-item-note', data )
                                                .then( res => {
                                            
                                                })
                                                .catch((error) => {
                                                    alert('Error please ask staff for help');
                                                });
                                            }
                                            
                                        }
                                    }
                                }
                            }
                       }
                    }
                }           
            //this is what happens if not family
            }else{
                if (etat[index].quantity > itmax || etat[index].quantity < 0){
                    alert('Quantity invalid')
               } else{
                if(change[index].chg === false && notes[index] !== undefined && alternative[index] !== undefined){
                    const data= {
                        itname:  itname,
                        formid: first.formid,
                        amount: etat[index].quantity,
                        selection: notes[index].choice,
                        alternative: alternative[index].alt
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
                    if(change[index].chg === false && notes[index] !== undefined && alternative[index] === undefined){
                        const data= {
                            itname:  itname,
                            formid: first.formid,
                            amount: etat[index].quantity,
                            selection: notes[index].choice,
                            alternative: ''
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
                        if(change[index].chg === false && notes[index] === undefined && alternative[index] !== undefined){
                        const data= {
                            itname:  itname,
                            formid: first.formid,
                            amount: etat[index].quantity,
                            selection: '',
                            alternative: alternative[index].alt
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
                            if(change[index].chg === false && notes[index] === undefined && alternative[index] === undefined){
                                const data= {
                                    itname:  itname,
                                    formid: first.formid,
                                    amount: etat[index].quantity,
                                    selection: '',
                                    alternative: ''
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
                                //in cases below we are updating items and not adding new ones
                            }else{
                                if(change[index].chg === true && notes[index] === undefined && alternative[index] !== undefined){
                                    const data= {
                                        itname:  itname,
                                        formid: first.formid,
                                        amount: etat[index].quantity,
                                        alternative: alternative[index].alt
                                    }
                                    
                                    axios.post('http://localhost:4000/update-items', data )
                                    .then( res => {
                                 
                                    })
                                    .catch((error) => {
                                        alert('Error please ask staff for help');
                                    });

                                    axios.post('http://localhost:4000/update-formitem-alt', data )
                                    .then( res => {
                                 
                                    })
                                    .catch((error) => {
                                        alert('Error please ask staff for help');
                                    });
                                
                                }else{
                                    if(change[index].chg === true && notes[index] === undefined && alternative[index] === undefined){
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
                                    }else{
                                        if(change[index].chg === true && notes[index] !== undefined && alternative[index] !== undefined){
                                            const data= {
                                                itname:  itname,
                                                formid: first.formid,
                                                amount: etat[index].quantity,
                                                selection: notes[index].choice,
                                                alternative: alternative[index].alt
                                            }
                                    
                                            axios.post('http://localhost:4000/update-items', data )
                                            .then( res => {
                                        
                                            })
                                            .catch((error) => {
                                                alert('Error please ask staff for help');
                                            });
                                            axios.post('http://localhost:4000/update-item-note', data )
                                            .then( res => {
                                        
                                            })
                                            .catch((error) => {
                                                alert('Error please ask staff for help');
                                            });
                                            axios.post('http://localhost:4000/update-formitem-alt', data )
                                            .then( res => {
                                        
                                            })
                                            .catch((error) => {
                                                alert('Error please ask staff for help');
                                            });
                                        }else{
                                            const data= {
                                                itname:  itname,
                                                formid: first.formid,
                                                amount: etat[index].quantity,
                                                selection: notes[index].choice,
                                            }
                                            axios.post('http://localhost:4000/update-items', data )
                                            .then( res => {
                                        
                                            })
                                            .catch((error) => {
                                                alert('Error please ask staff for help');
                                            });
                                            axios.post('http://localhost:4000/update-item-note', data )
                                            .then( res => {
                                        
                                            })
                                            .catch((error) => {
                                                alert('Error please ask staff for help');
                                            });
                                        }
                                        
                                    }
                                }
                            }
                        }
                   }
                }
               }
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
    const handleNotes = (e, i) => {
        e.persist();
      const newNote = [...notes];
      newNote[i] = {
        ...newNote[i],
        [e.target.name]: e.target.value
      };
      setNotes(newNote);
      
    }
    const handleAlt = (e, i) => {
        e.persist();
      const newAlt = [...alternative];
      newAlt[i] = {
        ...newAlt[i],
        [e.target.name]: e.target.value
      };
      setAlternative(newAlt);
    }
    

    const handleMessageChange = event => {

      setMessage(event.target.value);
    }

  

    return(
        <section>
            <Nav />
            <body class="bg-light text-dark p-5">
            <h1 class="text-warning">List of availbale Fruits</h1>

            <section><h2 class="text-danger">{empty? 'We are out of Fruits' : <>Max {maximum} Fruits ({maximumf} for families)</>}</h2></section>
            <div class="h-100 card-group ">

            {
            items.map((item, index) => (
                
                <div style={{paddingBottom: '20pt', paddingRight: '20pt', paddingTop: '20pt'}}>

                <div class="card" style={{width: '18rem'}}>
                    <div class="card-body">
                    <form class="needs-validation"  onSubmit={(e) => handleItem(e,item.itname, item.max, index)} novalidate>
                    {(item.availability === 'Low Stock')? <div class="row g-2 " style={{paddingBottom: '5px'}}>
                        <div class="col"><h5 class="card-title">{item.itname}</h5></div>
                        <div class="col text-end"><h6 style={{display: 'inline', borderRadius: '10px'}} class=" bg-warning p-1">{item.availability}</h6></div>
                    </div> : <div class="col"><h5 class="card-title">{item.itname}</h5></div>}
                        <input class="form-control" type="number" placeholder="Quantity"  name="quantity" onChange={(e) => handleChange(e, index )} aria-label="default input example" required />
                        <p class="card-text text-danger">Limit: {state.family ? (  item.max * 2) : (item.max)}</p>
                        {(item.description !== '')? <input class="form-control" type="text" placeholder="Selection choice"  name="choice" onChange={(e) => handleNotes(e, index )} aria-label="default input example" required/> : ''}
                        {(item.description !== '')? <h6 class="card-text"><span class="text-danger">Selection:</span> {item.description}</h6> : ''}
                        {(item.availability === 'Low Stock')? <div><input class="form-control" type="text" placeholder="(Optional) Alternative"  name="alt" onChange={(e) => handleAlt(e, index )} aria-label="default input example"/>
                        <p class="card-text text-danger"> Low in stock. Type alternative item</p></div> : null}
                        <button style={{marginTop: '5pt'}} type="submit" class="btn btn-secondary" >{((change[index] === undefined) ||(change[index].chg === false) ) ? 'Add to form' : 'Update form'}</button>
                        </form>
                    </div>
                </div>
            </div>
            ))
            }

            </div>
            <textarea class="form-control "  rows="3"        id="notes"  onChange={handleMessageChange} style={{height: '5rem'}} type="text" placeholder="Addtional comments"  name="cnotes" aria-label="default input example"/>
            <h4 style={{paddingTop: '20px'}} >Please <span class="text-danger">click add to form</span> on all chosen items before clicking next</h4>
            <button type="button" className="btn btn-danger" onClick={handleSubmit}style={{width: '30%'}} >Next</button>
            </body>
            
            <Prompt
       when={isFormIncomplete}
       message="Please do not leave form until submitted, Click on CANCEL" />
        </section>
    );
}

export default Formfruits;