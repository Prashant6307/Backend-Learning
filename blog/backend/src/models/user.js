const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
    },
    password:{
        type: String,
    },
    profileBio:{
        type: String,
    }
},{timestamps: true})


const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel