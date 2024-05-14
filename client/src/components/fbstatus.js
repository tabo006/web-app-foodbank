
import React, {useEffect, useState} from 'react';




function Fbstatus(){
    const [status, setStatus] = useState([]);
    const [isColored, setIsColored] = useState(true);
    useEffect( () => {
        fetch('http://localhost:4000/fbstatus') 
            .then(res => {
                return res.json();
            }).catch((error) => {
                alert('error with server ask for help')
            })
            .then(data => {
                setStatus(data)
                if(data[0].fbstatus === 'Out of Stock'){
                    setIsColored(false)
                }else{
                    setIsColored(true)
                }
            })
    }, [status]);
    
        

    return(
        <body class="text-bg- text-dark p-5 text-center">
            {
            status.map((status, index) => (
                <section class="text-bg- text-dark p-5 text-center"  ><h1 style={{backgroundColor: isColored ? 'green' : 'red'}} >We are {status.fbstatus}</h1></section>
            ))
            }
        </body>
    );
}

export default Fbstatus;