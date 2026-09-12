const mongoose = require('mongoose');
const validator = require("validator")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is not valid " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("Users", userSchema)

module.exports = UserModel