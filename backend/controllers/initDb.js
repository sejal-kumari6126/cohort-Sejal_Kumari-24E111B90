const {query}= require('../models/connections.js');
const initDatabase= async()=>{
    const createTableQuery=`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    registration_no VARCHAR(20) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL ,
    age INTEGER NOT NULL,
    
    CONSTRAINT age_check
    CHECK (age BETWEEN 15 AND 65),

    CONSTRAINT pass_check
    CHECK (char_length(password)>=8),

    CONSTRAINT registration_no_check
    CHECK (char_length(registration_no)=10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`;

try{
    await query(createTableQuery);
    console.log("Table created Successfully ");
}
catch(error){
    console.log(error);
    process.exit(1);
};
}

module.exports={
    initDatabase
}
