const validator = require("validator")

const validateSignupData = (req)=>{
    const {firstName, emailId, password} = req.body
    if(!firstName){
        throw new Error ("Please enter First name")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error ("Please enter a valid email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("Please enter a strong password")
    }
}

module.exports = {
    validateSignupData
}