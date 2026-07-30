const express = require ('express')
const app= express();
require('dotenv').config()
const PORT= process.env.PORT;
app.get('/',(req,res)=>{
    res.status(200).json({
        status:"Success",
        message:"Welcome to the User Management API"
    })
})
app.listen(process.env.PORT,(err)=>{
    if (err) console.log(err)
})