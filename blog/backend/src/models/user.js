const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    emailId:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileBio:{
        type: String,
    },
    photoUrl:{
        type: String,
        default: "https://img.magnific.com/premium-vector/default-av…ration_561158-3407.jpg?semt=ais_hybrid&w=740&q=80"
    }
},{timestamps: true})


const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel