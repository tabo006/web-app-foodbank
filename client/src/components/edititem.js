
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 

function Edititem(){
    const {state} = useLocation();
    const { itname} = state;
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [item, setItem] = useState({
        name: '',
        category: '',
        max:'' ,
    })

    useEffect(() => {
        axios.get('http://localhost:4000/item', {
            params: {
              itname: itname
            } 
        }).catch((error) => {
            alert('error with server ask for help')
            navigate('/adminhome')
        })
        .then(res => {
            setItems(res.data);
        })
     
      }, [items]);

      const handleInput = (e) => {
        e.persist();
        setItem({...item, [e.target.name]: e.target.value});

    }
    const handleBack = (e) => {
        const data= {
            valid: true
        }
        navigate('/itemsout', {state: data})
    }

      const saveMax = (e)  => {
        e.persist();
        e.preventDefault();
        const data= {
            itname: itname,
            maxchg: item.max
        }
        if(item.max < 1){
            alert('Max should be greater than 1')
        }else{
            axios.post('http://localhost:4000/update-item-max', data )
            .then( res => {

               alert('Max changed')
               window.location.reload();
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
        }
            
      }
      const saveName = (e)  => {
        e.persist();
        e.preventDefault();
        const data= {
            itname: itname,
            itchange: item.name
        }

            axios.post('http://localhost:4000/update-item-name', data )
            .then( res => {
                const data= {
                    valid: true
                }
               alert('Name changed')
               navigate('/itemsout',{state:data})
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
        
           
      }
      const handleDescriptionChange = event => {

        setDescription(event.target.value);
      }

      const saveCategory = (e)  => {
        e.persist();
        e.preventDefault();
        const data= {
            itname: itname,
            ctgchange: item.category
        }

            axios.post('http://localhost:4000/update-item-category', data )
            .then( res => {

               alert('Category changed')
               window.location.reload();
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
      }

      const saveDescription = (e)  => {
        e.persist();
        e.preventDefault();
        const data= {
            itname: itname,
            description: description
        }

            axios.post('http://localhost:4000/update-item-description', data )
            .then( res => {

               alert('Description changed')
               window.location.reload();
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
      }
    return(
        <body>
            <Nav/>
            <section class="bg-light text-dark p-5 ">
                
                {
                    items.map((itm, index) => (
                        <section>
                        <h1 class="text-warning"style={{paddingBottom: '20px'}}>{itm.itname}</h1>
                        <form class="needs-validation" onSubmit={saveName} novalidate>
                        <h4 >Edit name of item</h4>
                        <input type="text" class="form-control" name="name" id="validationCustom01"  value={item.name} onChange={handleInput} placeholder={"Current name: "+itm.itname} aria-label={itm.itname} required/>
        
                        <button class="btn btn-danger me-md-2 w-50" type="submit">Edit</button>
                        </form>
                        <h4 style={{paddingTop: '30px'}}>Edit max amount of item</h4>
                        
                        <form class="needs-validation" onSubmit={saveMax} novalidate>
                        <input type="number" class="form-control" name="max" id="validationCustom01" value={item.max} onChange={handleInput} placeholder={"Current max: "+itm.max} aria-label={itm.max} required/>
        
                             <button class="btn btn-danger me-md-2 w-50" type="submit">Edit</button>
                        </form>
        
                        
                        <form class="needs-validation" onSubmit={saveCategory} novalidate>
                        <h4 style={{paddingTop: '30px'}}>Edit category of item</h4>
                        <input type="text" class="form-control" name="category"  id="validationCustom01" value={item.category} onChange={handleInput} placeholder={"Current category: "+itm.category} aria-label={itm.category} required/>
        
                        <button class="btn btn-danger me-md-2 w-50" type="submit">Edit</button>

                        
                        </form>

                        <form class="needs-validation" onSubmit={saveDescription} novalidate>
                        <h4 style={{paddingTop: '30px'}}>Edit description of item</h4>
                        <textarea class="form-control "  rows="3"        id="description"  onChange={handleDescriptionChange} style={{height: '5rem'}} type="text" placeholder={"Current description: "+itm.description}  name="description" aria-label="default input example"/>
        
                        <button class="btn btn-danger me-md-2 w-50" type="submit">Edit</button>

                        
                        </form>
                        </section>
                        
                        
                    ))
                    }
                
                <div class="col" style={{paddingTop: '30px'}}><button class="btn btn-secondary  w-100" type="button"  onClick={handleBack} style={{marginBottom: '30px'}} >Back</button></div>
            </section>
        </body>

    );
}

export default Edititem;