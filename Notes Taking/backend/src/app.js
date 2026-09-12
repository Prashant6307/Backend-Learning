const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
const connectDB = require('./config/db');
const app = express()
dotenv.config()

app.use(express.json())

const authRouter = require("./routes/auth")


app.use("/", authRouter)

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log("server started on port 3000");

    })

}).catch((err) => {
    console.log("Database connection failed "+ err);

})
