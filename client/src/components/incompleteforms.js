
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 


function Incompleteforms(){
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const {state} = useLocation();
    const [search, setSearch] = useState({
        fname: '',
        lname: ''
    })
    const handleInput = (e) => {
        e.persist();
        setSearch({...search, [e.target.name]: e.target.value});
    }
    useEffect(() => {
        if (state === null){
            navigate('/sadmin')

            
        }
      }, [state]);
    useEffect( () => {
        fetch('http://localhost:4000/incomplete-forms') 
            .then(res => {
                return res.json();
            }).catch((error) => {

                navigate('/adminhome')
            })
            .then(data => {
                setForms(data)
            })
    }, [forms]);

    const handleSubmit = (e, id, fnme, lnme) => {
        e.persist();
        e.preventDefault();
        const data= {
            formid: id,
            fname: fnme,
            lname: lnme
        }
        navigate('/iviewform', {state: data})
    }
    const handleDelete = (e) => {
        e.persist();
        e.preventDefault();
            axios.post('http://localhost:4000/update-deleteforms-incomplete')
            .then( res => {
               alert('All incomplete forms deleted')

            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
    }

    const handleSearch = (e) => {
        const data= {
            fname: search.fname,
            lname: search.lname,
            status: `and fstatus='incomplete'`
        }
        navigate('/searchresult', {state: data})
    }

    return(
        <body>
            <Nav/>
            <section class="bg-light text-dark p-5">
            <div class="row g-3">
            <div class="col"><h1 class="text-warning" style={{paddingBottom: '30px'}}>Incomplete forms</h1></div>
            <div class="col"><form class="d-flex" onSubmit={handleSearch} role="search">
                    <input class="form-control me-2" type="search" name="fname" id="validationCustom01" onChange={handleInput} placeholder="First name" aria-label="Search" required/>
                    <input class="form-control me-2" type="search" name="lname" id="validationCustom01" onChange={handleInput} placeholder="Last name" aria-label="Search" required/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form></div>
            </div>
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                 <div class="col"><button class="btn btn-danger  w-100" type="button"  onClick={handleDelete} style={{marginBottom: '30px'}} >Delete all Incomplete</button></div>
                </div>

                <table class="table table-striped ">
               
                <tbody>
                {
            forms.map((form, index) => (
                <tr>
                    <td>{form.fname} {form.lname}</td>
                    <td>Status: {form.fstatus}</td>
                    <td>Submission time: {new Date(form.date_form).toLocaleString()}</td>
                    <td><button type="button" class="btn btn-custom2" onClick={(e) => handleSubmit(e, form.formid, form.fname, form.lname )}>View Form</button></td>
                    
                </tr>
                
            ))
            }
            </tbody>
         </table>
            </section>
        </body>
    );
}

export default Incompleteforms;