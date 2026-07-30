const express = require ('express')
const app= express();
require('dotenv').config()
const PORT= process.env.PORT;

const {initDatabase}=require('./controllers/initDb');
const db=require('./models/connections.js');
initDatabase();

app.get('/',(req,res)=>{
    res.status(200).json({
        status:"Success",
        message:"Welcome to the User Management API"
    })
})
app.get('/users', async(req,res)=>{
    const getusersQuery=`SELECT * FROM users`;
    try{
        const result= await db.query(getusersQuery);
        res.status(200).json({
            status:"Success",
            message:"All users Fetched",
            data:result.rows
        })
    }
    catch(error){
        return res.status(500).json({
            status:"Failed",
            message:"Something went wrong",
            error:error
        })
    }
})
app.listen(process.env.PORT,(err)=>{
    if (err) console.log(err)
})

