
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 

function Additem(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const [item, setItem] = useState({
        itname: '',
        category: '',
        max: ''
    })
    const [description, setDescription] = useState('');
    useEffect(() => {
        if (state === null){
            navigate('/sadmin')
        }
      }, [state]);

    const handleInput = (e) => {
        e.persist();
        setItem({...item, [e.target.name]: e.target.value});
    }
    const saveForm = (e)  => {

        e.preventDefault();
        const status= 'OUT'
        const data= {
            nme: item.itname,
            ctg: item.category,
            sts: status,
            max: item.max,
            description: description
        }

        axios.post('http://localhost:4000/add-item', data )
        .then( res => {
            const data= {
                valid: true
            }
            alert('Item added with OUT status');
            navigate('/itemsout', {state: data})
        })
        .catch((error) => {
            alert('Item name is already in the system');
        });
    }
    const handleDescriptionChange = event => {

        setDescription(event.target.value);
      }
      const handleBack = (e) => {
        const data= {
            valid: true
        }
        navigate('/adminhome', {state: data})
    }
    return(
        <body>
            <Nav/>
            <section class="bg-light text-dark p-5 text-center">
            <h1 class="text-warning">Fill in Item information then click Add</h1>
            <form class="needs-validation" onSubmit={saveForm} novalidate>
            <div class="row g-3" style={{paddingTop: '30px'}}>
            <div class="col">
                <input type="text" class="form-control" id="validationCustom01" name="itname" value={item.itname} onChange={handleInput} placeholder="Item name" aria-label="Item name" required />
            </div>
            <div class="col">
                <input type="text" class="form-control" id="validationCustom02" name="category" value={item.category} onChange={handleInput} placeholder="Item category" aria-label="Item category" required/>
            </div>
            <div class="col">
                <input type="number" class="form-control" name="max" id="validationCustom04" value={item.max} onChange={handleInput} placeholder="Max of item" aria-label="Max of item" required/>
            </div>
            </div>
            <div class="row g-3" style={{paddingTop: '30px'}}>
            <div class="col">
                <textarea class="form-control "  rows="3"        id="description"  onChange={handleDescriptionChange} style={{height: '5rem'}} type="text" placeholder="Description"  name="description" aria-label="default input example"/>
            </div>
            </div>
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-secondary w-100" type="button"  onClick={handleBack} style={{marginTop: '40px'}} >Back</button></div>
                 <div class="btn-group me-2" role="group" aria-label="First group"><button class="btn btn-danger w-100" type="submit" style={{marginTop: '40px'}} >Add</button></div>
                
            </div>
            
            </form>
        </section>
        </body>
    );
}

export default Additem;
