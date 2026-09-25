const express = require('express')
const connectDB = require('./db/db')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');

const app = express()

dotenv.config()
app.use(express())
app.use(express.json())
app.use(cookieParser())
const authRouter = require("./routes/auth.route")
const blogRouter = require("./routes/blog.route")

app.use("/", authRouter)
app.use("/", blogRouter)

connectDB().then(() => {

    console.log("Database connected successfully")

    app.listen(3000, () => {
        console.log("Server started on port 3000")

    })

})

