import { useLocation } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Nav from './Anav'; 

function Searchresult(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const [forms, setForms] = useState([]);

      useEffect(() => {
        if(state === null){
            navigate('/sadmin')
        }else{
            axios.get('http://localhost:4000/form-search-category', {
            
            params: {
              fname: state.fname,
              lname: state.lname,
              status: state.status
            } 
        })
        .then(res => {
            setForms(res.data);
        })
        .catch((error) => {
        });
        }
      }, [forms]);

      const handleSubmit = (e, id, fnme, lnme, cnts, vnts, ants, status) => {
        e.persist();
        e.preventDefault();
        console.log(status)
        const data= {
            formid: id,
            fname: fnme,
            lname: lnme,
            cnotes: cnts,
            vnotes: vnts,
            anotes: ants
        }
        
        if(status === 'submitted'){
            navigate('/sviewform', {state: data})
        }else{
            if(status === 'approved'){
                navigate('/aviewform', {state: data})
            }else{
                if(status === 'completed'){
                    navigate('/cviewform', {state: data})
                }else{
                    if(status === 'logged'){
                        navigate('/lviewform', {state: data})
                    }else{
                        if(status === 'active'){
                            navigate('/acviewform', {state: data})
                        }else{
                            if(status === 'incomplete'){
                                navigate('/iviewform', {state: data})
                            }
                        }
                    }
                }
            }
        }

    }
    return(
        <body>
            <Nav/>
            <section class="bg-light text-dark p-5 ">
                <h1 class="text-warning" style={{paddingBottom: '30px'}}>Search Results</h1>
                <table class="table table-striped ">
               
                <tbody>
                {
            forms.map((form, index) => (
                <tr>
                    <td>{form.fname} {form.lname}</td>
                    <td>Status: {form.fstatus}</td>
                    <td>Submission time: {new Date(form.date_form).toLocaleString()}</td>
                    <td><button type="button" class="btn btn-custom2" onClick={(e) => handleSubmit(e, form.formid, form.fname, form.lname, form.cnotes, form.vnotes, form.anotes, form.fstatus)}>View Form</button></td>
                    
                </tr>
                
            ))
            }
            </tbody>
         </table>
            </section>
        </body>
    );
}

export default Searchresult;