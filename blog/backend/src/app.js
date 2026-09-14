const express = require('express')
const connectDB  = require('./db/db')
const dotenv = require('dotenv');

const app = express()
dotenv.config()
app.use(express())


connectDB().then(()=>{
    
    console.log("Database connected successfully")

    app.listen(3000, ()=>{
        console.log("Server started on port 3000")
        
    })
    
})