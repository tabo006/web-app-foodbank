
import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Vnav'; 

function Vsubmittedforms(){
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const [volunteer, setVolunteer] = useState({
        vname: '',
    })
    const {state} = useLocation();
    useEffect(() => {
        if (state === null){
            navigate('/svolun')
        }
      }, [state]);
    useEffect( () => {
        fetch('http://localhost:4000/approved-forms') 
            .then(res => {
                return res.json();
            }).catch((error) => {
                navigate('/volunhome')
            })
            .then(data => {
                setForms(data)
            })
    }, [forms]);

    const saveForm = (e, id, fnme, lnme, cnts, ants)  => {

        e.preventDefault();
        const data= {
            formid: id,  
            vname: volunteer.vname
        }

        const data2={
            formid: id,
            fname:  fnme, 
            lname:  lnme,
            cnotes: cnts,
            anotes: ants
        }
        axios.post('http://localhost:4000/update-volunteer-name', data )
            .then( res => {
     
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });

         axios.post('http://localhost:4000/update-activeform', data )
        .then( res => {

            navigate('/vviewform', {state: data2})
        })
        .catch((error) => {
            alert('Error please ask staff for help');
        });
    }

    const handleInput = (e) => {
        e.persist();
        setVolunteer({...volunteer, [e.target.name]: e.target.value});
    }
    const handleBack = (e) => {
        const data= {
            valid: true
        }
        navigate('/volunhome', {state:data})
    }
    return(
        <body>
                        <Nav/>
            <section class="bg-light text-dark p-5 ">
                <h1 class="text-warning" style={{paddingBottom: '30px'}}>Volunteer submitted forms</h1>
                <table class="table table-striped ">
               
                <tbody>
                {
            forms.map((form, index) => (
                <tr>
                    <td>{form.fname} {form.lname}</td>
                    <td>Status: {form.fstatus}</td>
                    <td>Submission time: {new Date(form.date_form).toLocaleString()}</td>
                    <td><form class="needs-validation" onSubmit={(e) => saveForm(e, form.formid, form.fname, form.lname, form.cnotes, form.anotes )} novalidate>
                        <input type="text" class="form-control" id="validationCustom01" name="vname" onChange={handleInput} placeholder="name" aria-label="Item name" required />
                    <button type="submit" class="btn btn-danger" >Handle form</button>
                    </form></td>

                    
                </tr>
                
            ))
            }
            </tbody>
         </table>
            </section>
        </body>
    );
}

export default Vsubmittedforms;