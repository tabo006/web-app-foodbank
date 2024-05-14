import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from './Anav'; 

function Editlimit(){
    const {state} = useLocation();
    const navigate = useNavigate();
    const [category, setCategory]= useState([])
    const [limit, setLimit] = useState({
        max: '',
        maxf: '',
    })

    useEffect(() => {
        if (state === null){
            navigate('/sadmin')
        }else{
            axios.get('http://localhost:4000/category-limit', {
                params: {
                  cname: state.cname
                } 
            })
            .then(res => {
                setCategory(res.data);
            })
            .catch((error) => {
                alert('error with server');
            });
        }

      }, [state]);

      const handleInput = (e) => {
    
        e.persist();
        setLimit({...limit, [e.target.name]: e.target.value});

    }
    const handleBack = (e) => {
        const data= {
            valid: true
        }
        navigate('/climit', {state: data})
    }

    const saveLimit = (e, type)  => {
        e.persist();
        e.preventDefault();
        if (type ==='f'){
            if(limit.maxf < 1){
                alert('Max should be greater than 1')
            }else{
            const data= {
                ltype: 'maximum_f',
                limit: limit.maxf,
                ctg: state.cname
            }
            axios.post('http://localhost:4000/update-category-limits', data )
            .then( res => {

               alert('Limit changed')
               window.location.reload();
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
        }
        }else{
            if(limit.max < 1){
                alert('Max should be greater than 1')
            }else{
                console.log('im')
            const data= {
                ltype: 'maximum',
                limit: limit.max,
                ctg: state.cname
            }
            axios.post('http://localhost:4000/update-category-limits', data )
            .then( res => {

               alert('Limit changed')
               window.location.reload();
            })
            .catch((error) => {
                alert('Error please ask staff for help');
            });
        }
        }
 
        }
            

    return(
        <body>
            <Nav/>
            <section class="bg-light text-dark p-5 ">
                
                {
                    category.map((ctg, index) => (
                        <section>
                        <h1 class="text-warning"style={{paddingBottom: '20px'}}>{ctg.category}</h1>

                        <form class="needs-validation"  onSubmit={(e) => saveLimit(e,'I')}  novalidate>
                        <h4 >Edit Individual limit</h4>
                        <input type="number" class="form-control" name="max" id="validationCustom01" value={limit.max} onChange={handleInput} placeholder={"Current limit: "+ctg.maximum} aria-label={ctg.maximum} required/>
        
                        <button class="btn btn-danger me-md-2 w-50" type="submit">Edit</button>
                        </form>

                        <h4 style={{paddingTop: '30px'}}>Edit Family limit</h4>
                        
                        <form class="needs-validation" onSubmit={(e) => saveLimit(e,'f')}  novalidate>
                        <input type="number" class="form-control" name="maxf" id="validationCustom01" value={limit.maxf} onChange={handleInput} placeholder={"Current limit: "+ctg.maximum_f} aria-label={ctg.maximum_f} required/>
        
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

export default Editlimit;