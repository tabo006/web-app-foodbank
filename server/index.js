const cors=require("cors");
const bodyParser = require("body-parser");
const knex = require('knex');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const {Client} = require('pg')
const express = require('express')
const router = express.Router();
const db = knex({
    client: 'pg',
    connection: {
        host: "localhost",
        user: "postgres",
        password: "Yandjimadji1",
        database: "postgres"
    },
});

const app = express()
const port = 4000
app.use(cors(corsOptions))
const client = new Client ({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Yandjimadji1",
    database: "postgres"
})

client.connect();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/items', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from item`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
    

})
app.get('/account-info', async (req, res) => {
    try{
        const { rows } = await client.query(`select * from account where type='`+req.query.type+`'` ) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.get('/form-search-category', async (req, res) => {
    try{
        const { rows } = await client.query(`select * from form where LOWER(fname)  like LOWER('`+req.query.fname+`') and LOWER(lname)  like LOWER('`+req.query.lname+`')` + req.query.status) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.get('/total-category', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT sum(amount) from form_item inner join item on form_item.itname = item.itname where formid = `+req.query.formid+` and category='`+req.query.category+`'` ) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.get('/items-category', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from item where category= '`+req.query.category+`' and itstatus= 'IN'`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.get('/fbstatus', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from foodbank_status`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
    

})

app.get('/form-item', async (req, res) => {
    
    try{
        const { rows } = await client.query(`SELECT * from form_item`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }

})

app.get('/item', async (req, res) => {
    const { rows } = await client.query(`SELECT * from item where itname='`+req.query.itname+`'`) 
    res.send(rows)

})

app.get('/items-in', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from item where itstatus='IN'`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
})

app.get('/items-out', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from item where itstatus='OUT'`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
})

app.get('/category-limit', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from category_limit where category='`+req.query.cname+`'`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
})

app.get('/all-category-limit', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from category_limit`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
})

app.get('/all-forms', async (req, res) => {
   
    try{
        const { rows } = await client.query(`SELECT * from form order by date_form`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
   
})
app.get('/submitted-forms', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from form where fstatus='submitted' order by date_form`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
    
   
})

app.get('/approved-forms', async (req, res) => {
    
   try{
    const { rows } = await client.query(`SELECT * from form where fstatus='approved' order by date_form`) 
    res.send(rows)
   }catch(error){
    res.status(401).send('error');
}
})

app.get('/completed-forms', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from form where fstatus='completed' order by date_form`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
    
   
})

app.get('/logged-forms', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from form where fstatus='logged' order by date_form`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
    
   
})
app.get('/active-forms', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from form where fstatus='active' order by date_form`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
    
   
})


app.get('/incomplete-forms', async (req, res) => {
    try{
        const { rows } = await client.query(`SELECT * from form where fstatus='incomplete' order by date_form`) 
        res.send(rows)
    }catch(error){
        res.status(401).send('error');
    }
})

app.post('/add-form', (req, res) => {
    db('form')
        .insert({  
            fstatus: req.body.sts,
            fname: req.body.fnme,
            lname: req.body.lnme,
            cnotes: req.body.cnt,
            vnotes: req.body.vnt,
            anotes: req.body.ant,
            date_form: req.body.fdate
        })
        .then(() => {
            return res.json({ msg: 'Form Added' });
        })
        .catch((error) => {
            res.status(401).send('Already ordered');
        });
});


app.post('/add-item', (req, res) => {
    db('item')
        .insert({  
            itname: req.body.nme,
            category: req.body.ctg,
            itstatus: req.body.sts,
            max: req.body.max,
            description: req.body.description,
            availability: 'high'
        })
        .then(() => {
            return res.json({ msg: 'Item Added' });
        })
        .catch((error) => {
        res.status(401).send('Item already in system');
        });
});

app.get('/formid',  async (req, res) => {
    try{
    const  {rows}  = await client.query(`SELECT formid from form where fname= '`+ req.query.fnme+`' and lname= '`+ req.query.lnme+ `' and date_form='`+ req.query.date +`'`) ;
    res.send(rows);
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.get('/formview-items',  async (req, res) => {
    try{
        const  {rows}  = await client.query(`SELECT * from form_item where formid= `+ req.query.formid) ;
        res.send(rows);
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.post('/add-formitem', (req, res) => {
    db('form_item')
        .insert({  
            itname: req.body.itname,
            formid: req.body.formid,
            amount: req.body.amount,
            selection: req.body.selection,
            alternative: req.body.alternative
        })
        .then(() => {
            return res.json({ msg: 'Form Added' });
        })

        .catch((error) => {
            res.status(401).send('Error please ask staff for help');
            });

       
});

app.post('/update-items', async (req, res) => {
    try{
        await client.query(`update form_item set amount =` +req.body.amount+` where formid= `+ req.body.formid +` and itname= '`+req.body.itname+`'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    


})

app.post('/update-item-name', async (req, res) => {
    try{
        await client.query(`update item set itname = '`+ req.body.itchange +`' where itname= '`+ req.body.itname+`'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    


})

app.post('/update-item-max', async (req, res) => {
    try{
        await client.query(`update item set max = '`+ req.body.maxchg +`' where itname= '`+ req.body.itname+`'`) ;
    res.send();
    }catch(error){
        res.status(401).send('error');
    }
    

})

app.post('/update-formitem-amount', async (req, res) => {
    try{
        await client.query(`update form_item set amount = ` + req.body.amountchg + ` where formid=`+req.body.formid+ ` and itname= '`+req.body.itname+ `'`);
        res.send(); 
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.post('/update-formitem-alt', async (req, res) => {
    try{
        await client.query(`update form_item set alternative = '` + req.body.alternative + `' where formid=`+req.body.formid+ ` and itname= '`+req.body.itname+ `'`);
        res.send(); 
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.post('/update-item-category', async (req, res) => {
    try{
        await client.query(`update item set category= '`+ req.body.ctgchange +`' where itname= '`+ req.body.itname+`'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
   


})
app.post('/update-item-description', async (req, res) => {
    try{
        await client.query(`update item set description= '`+ req.body.description +`' where itname= '`+ req.body.itname+`'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    

})

app.post('/update-orderdone', async (req, res) => {
    try{
        await client.query(`update form set fstatus = 'submitted' where formid= `+ req.body.formid) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
   
})
app.post('/update-itemstatus-to-out', async (req, res) => {
    try{
        await client.query(`update item set itstatus = 'OUT' where itname= '`+ req.body.itname+`'`) ;
        res.send()
    }catch(error){
        res.status(401).send('error');
    }
    ;
})
app.post('/update-itemstatus-to-in', async (req, res) => {
    try{
        await client.query(`update item set itstatus = 'IN' where itname= '`+ req.body.itname+`'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
   
})

app.post('/update-approveform', async (req, res) => {
    try{
        await client.query(`update form set fstatus = 'approved' where formid= `+ req.body.formid) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.post('/update-activeform', async (req, res) => {
    try{
        await client.query(`update form set fstatus = 'active' where formid= `+ req.body.formid) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.post('/update-completeform', async (req, res) => {
    try{
        await client.query(`update form set fstatus = 'completed' where formid= `+ req.body.formid) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.post('/update-loggedform', async (req, res) => {
    try{
        await client.query(`update form set fstatus = 'logged' where formid= `+ req.body.formid) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.post('/update-item-availability-low', async (req, res) => {
    try{

        await client.query(`update item set availability = 'Low Stock' where itname= '`+ req.body.itname +`'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.post('/update-item-availability-high', async (req, res) => {
    try{
        await client.query(`update item set availability = 'high' where itname= '`+ req.body.itname +`'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.post('/update-set-instock', async (req, res) => {
    try{
        await client.query(`update foodbank_status set fbstatus = 'In stock'`) ;
    res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.post('/update-set-outstock', async (req, res) => {
    try{
        await client.query(`update foodbank_status set fbstatus = 'Out of Stock'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.post('/update-deleteform', async (req, res) => {
    try{
        await client.query(`delete from form where formid= `+ req.body.formid) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.post('/update-deleteforms-incomplete', async (req, res) => {
    try{
        await client.query(`delete from form where fstatus= 'incomplete'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.post('/update-deleteformitem-0', async (req, res) => {
    try{
        await client.query(`delete from form_item where formid= `+ req.body.formid+` and itname='`+req.body.itname+`'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.post('/update-customer-notes', async (req, res) => {
    try{
        await client.query(`update form set cnotes = '` + req.body.cnotes + `' where formid= `+ req.body.formid) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.post('/update-item-note', async (req, res) => {
    try{

        await client.query(`update form_item set selection = '` + req.body.selection + `' where formid= `+ req.body.formid + ` and itname= '`+req.body.itname+ `'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.post('/update-volunteer-notes', async (req, res) => {
    try{
        await client.query(`update form set vnotes = '` + req.body.vnotes + `' where formid= `+ req.body.formid) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.post('/update-admin-notes', async (req, res) => {
    try{
        await client.query(`update form set anotes = '` + req.body.anotes + `' where formid= `+ req.body.formid) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.post('/update-volunteer-name', async (req, res) => {
    try{
        await client.query(`update form set vname = '` + req.body.vname + `' where formid= `+ req.body.formid) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})
app.post('/update-category-limits', async (req, res) => {
    try{
        await client.query(`update category_limit set `+req.body.ltype+`= ` + req.body.limit + ` where category= '`+ req.body.ctg+`'`) ;
        res.send();
    }catch(error){
        res.status(401).send('error');
    }
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


module.exports = router;
