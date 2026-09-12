const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    }
})

const UserModel = mongoose.model("Users". userSchema)

module.exports = UserModel