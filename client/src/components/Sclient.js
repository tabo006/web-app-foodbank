
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Nav'; 
import { useLocation } from "react-router-dom";


function Sclient(){
    const {state} = useLocation();
    const [family, setFamily] = useState(false);
    const handleChange = (event) => {
      setFamily(event.target.checked);
    }
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        Fname: '',
        Lname: '',
        email: ''
    })
    useEffect(() => {
        if (state === null){
            navigate('/policies')
        }
      }, [state]);

    const handleInput = (e) => {
        e.persist();
        setCustomer({...customer, [e.target.name]: e.target.value});
    }
    const[fulldate, setFulldate]=useState()

    const saveForm = (e)  => {
        let date = new Date();
        let month = date.getMonth() + 1
        let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const fulldate= date.getFullYear()+"-"+ month +"-"+date.getDate()+" "+time;
        setFulldate(fulldate)
        e.preventDefault();
        const data= {
            cnt: 'None' ,
            sts: 'incomplete',
            fnme: customer.Fname,
            lnme: customer.Lname,
            vnt: 'None',
            ant:'None',
            fdate: fulldate,
            family: family
        }

        axios.post('http://localhost:4000/add-form', data )
        .then( res => {
           // alert('Your order has been placed, please wait in line');

            navigate('/formfruits', {state: data})
        })
        .catch((error) => {

            alert('You have already ordered something today. Request help with staff if this is not the case');
        });
    }

    return(
        <body>
            <Nav/>
        <section class="bg-light text-dark p-5 text-center">
            
            <h1 class='text-warning'>Fill in personal information then click next</h1>
            <form class="needs-validation" onSubmit={saveForm} novalidate>
            <div class="row g-3" style={{paddingTop: '30px'}}>
            <div class="col">
                <input type="text" class="form-control" id="validationCustom01" name="Fname" value={customer.Fname} onChange={handleInput} placeholder="First name" aria-label="First name" required />
            </div>
            <div class="col">
                <input type="text" class="form-control" id="validationCustom02" name="Lname" value={customer.Lname} onChange={handleInput} placeholder="Last name" aria-label="Last name" required/>
            </div>
            </div>
            <div class="row g-3" style={{paddingTop: '30px'}}>
            
            <div >
                <input class="form-check-input" onChange={handleChange} type="checkbox" id="gridCheck"/>
                <label class="form-check-label" style={{marginLeft: '20px'}} for="gridCheck">
                    Check box if you are registered as a Family
                </label>
             </div>
            </div>
            <button class="btn btn-danger w-50" type="submit" style={{marginTop: '40px'}} >Next</button>
            </form>
        </section>
        </body>
    );
}

export default Sclient