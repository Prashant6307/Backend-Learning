const express = require('express')
const connectDB = require('./db/db')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const cors = require("cors")
const app = express()

dotenv.config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}))

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

