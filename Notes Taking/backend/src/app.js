const express = require('express');
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
const connectDB = require('./config/db');
const cors = require("cors")
const app = express()
dotenv.config()


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}))

app.use(express.json())
const authRouter = require("./routes/auth")
const notesRouter = require("./routes/notes")



app.use(cookieParser())

app.use("/", authRouter)
app.use("/", notesRouter)

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log("server started on port 3000");

    })

}).catch((err) => {
    console.log("Database connection failed " + err);

})
