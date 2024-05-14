
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import Nav from './Anav'; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AdminHome(){
    const {state} = useLocation();
      const [status, setStatus] = useState([]);
      const navigate = useNavigate();

      useEffect(() => {
        if (state === null){
            navigate('/sadmin')
            
        }
      }, [state]);

      useEffect( () => {
          fetch('http://localhost:4000/fbstatus') 
              .then(res => {
                  return res.json();
              }).catch((error) => {
                alert('error with server ask for help')
                navigate('/sadmin')
            })
              .then(data => {
                  setStatus(data)
              })
      }, []);

      const handleIn = (e) => {
        e.persist();
        e.preventDefault();

                axios.post('http://localhost:4000/update-set-instock')
                .then( res => {
                    alert('Status changed')
                    window.location.reload();

                })
                .catch((error) => {
                    alert('Error please ask staff for help');
                });
       }

       const handleOut = (e) => {
        e.persist();
        e.preventDefault();

                axios.post('http://localhost:4000/update-set-outstock')
                .then( res => {
                    alert('Status changed')
                    window.location.reload();

                })
                .catch((error) => {
                    alert('Error please ask staff for help');
                });
       }
    
    const handleAllforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/allforms', {state: data})
    }
    const handleSubmittedforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/submittedforms', {state: data})
    }
    const handleApprovedforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/approvedforms', {state: data})
    }
    const handleActiveforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/activeforms', {state: data})
    }
    const handleCompletedforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/completedforms', {state: data})
    }
    const handleIncompleteforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/incompleteforms', {state: data})
    }
    const handleLoggedforms = (e) => {
        const data= {
            valid: true
        }
        navigate('/loggedforms', {state: data})
    }

    const handleAllitems = (e) => {
        const data= {
            valid: true
        }
        navigate('/allitems', {state: data})
    }
    const handleItemsin = (e) => {
        const data= {
            valid: true
        }
        navigate('/itemsin', {state: data})
    }
    const handleItemsout = (e) => {
        const data= {
            valid: true
        }
        navigate('/itemsout', {state: data})
    }
    const handleAdditem = (e) => {
        const data= {
            valid: true
        }
        navigate('/additem', {state: data})
    }
    const handleCategory = (e) => {
        const data= {
            valid: true
        }
        navigate('/climit', {state: data})
    }
    return(

        <body >
            <Nav/>
            <section class="bg-light text-dark p-5 text-center">
            <h1 class="text-warning">Admin Home Page</h1>
            <section class="p-5">
                        <div class="container">
                            <div class="row text-center">
                                <div class="col-md">
                                    <div class="card text-center">
                                        <div class="card-header">
                                            Forms
                                        </div>
                                        <div class="card-body">
                                        <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Forms
                                        </button>
                                        <ul class="dropdown-menu text-center">
                                        <button className="btn btn-custom2" onClick={handleAllforms}>All Forms</button>
                                                <button  className="btn btn-custom2" onClick={handleSubmittedforms}>Submitted Forms</button>
                                               <button  className="btn btn-custom2" onClick={handleApprovedforms}>Approved Forms</button>
                                                <button  className="btn btn-custom2" onClick={handleActiveforms}>Active Forms</button>
                                                <button  className="btn btn-custom2" onClick={handleCompletedforms}>Completed Forms</button>
                                               <button  className="btn btn-custom2" onClick={handleIncompleteforms}>Incomplete Forms</button>
                                                <button className="btn btn-custom2" onClick={handleLoggedforms}>Logged Forms</button>

                                        </ul>
                                    </div>
                                    

                                        </div>
                                        <div class="card-footer text-body-secondary">
                                            UOSU Food Bank
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="card text-center">
                                        <div class="card-header">
                                            Items
                                        </div>
                                        <div class="card-body">

                                        <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Items
                                        </button>
                                        <ul class="dropdown-menu text-center">
                                        <button onClick={handleAllitems} className="btn btn-custom2">All Items</button>
                                            <button onClick={handleItemsin} className="btn btn-custom2">Items In stock</button>
                                            <button onClick={handleItemsout} className="btn btn-custom2">Items Out of stock</button>
                                            <button onClick={handleAdditem} className="btn btn-custom2">Add Item</button>
                                            <button onClick={handleCategory} className="btn btn-custom2">Category Limits</button>

                                        </ul>
                                    </div>
                                        
                                        </div>
                                        <div class="card-footer text-body-secondary">
                                            UOSU Food bank
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="card text-center">
                                        <div class="card-header">
                                        {
                                            status.map((status, index) => (
                                                <section >Current Food bank status: {status.fbstatus}</section>
                                            ))
                                        }
                                            
                                        </div>
                                        <div class="card-body">

                                            <button type="button" class="btn btn-success" onClick={handleIn} style={{marginRight: '20px'}}>
                                            In Stock
                                            </button>
                                            <button type="button" class="btn btn-danger" onClick={handleOut}>
                                            Out of Stock
                                            </button>
                                        
                                        

                                        
                                        </div>
                                        <div class="card-footer text-body-secondary">
                                            UOSU Food bank
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            </section>
        </body>

    );
}

export default AdminHome;