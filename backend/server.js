const express = require ('express')
const app= express();
require('dotenv').config()
const PORT= process.env.PORT;

app.use(express.urlencoded({extended:false}))
app.use(express.json())
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
app.post('/user', async(req,res)=>{
    const {name,registration_no,email,password,age}=req.body
    try{
        const createUserQuery=`
        INSERT INTO users(name,registration_no,email,password,age)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id,name,registration_no,email,password,age;`;
        const result= await db.query(createUserQuery,[name,registration_no,email,password,age]);
        res.status(201).json({
            status:"Success",
            message:"Created user sucessfully",
            data:result.rows[0]
        })
    }
    catch(error){
        return res.status(500).json({
            status:"Failed",
            message:"User cannot be created",
            error:error.message
        })
    }
})
app.post('/login', async(req,res)=>{
    const {name,password}=req.body
    try{
        const createUserQuery=`
        SELECT * FROM users
        WHERE name= $1 AND password=$2;`;
        const result= await db.query(createUserQuery,[name,password]);
        res.status(201).json({
            status:"Success",
            message:"Login sucessful",
            data:result.rows[0]
        })
    }
    catch(error){
        return res.status(500).json({
            status:"Failed",
            message:"Login failed",
            error:error.message
        })
    }
})
app.patch('/profile', async (req, res) => {

    const { id, name, registration_no, email, password, age } = req.body;

    try {
        const updateQuery = `
        UPDATE users
        SET
            name = $1,
            registration_no = $2,
            email = $3,
            password = $4,
            age = $5
        WHERE id = $6
        RETURNING *;
        `;
        
        const result = await db.query(updateQuery, [name,registration_no,email,password,age,id]);
        res.status(200).json({
            status: "Success",
            message: "Profile updated successfully",
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Profile update failed",
            error: error.message
        })
    }
})
app.delete('/profile', async (req, res) => {

    const {id} = req.body;

    try {
        const deleteQuery = `
        DELETE FROM users
        WHERE id = $1
        RETURNING *;
        `;
        
        const result = await db.query(deleteQuery, [id]);
        res.status(200).json({
            status: "Success",
            message: "User deleted successfully",
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "user deletion failed",
            error: error.message
        })
    }
})

app.listen(process.env.PORT,(err)=>{
    if (err) console.log(err)
})

