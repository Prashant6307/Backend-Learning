const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")

const userAuth = async (req, res, next) => {

    try {
        const { token } = req.cookie

        if(!token){
            throw new Error ("Token is not valid")
        }
        const decodedObj = jwt.verify(token, "NOTES@TAKING$1234")

        const { _id } = decodedObj

        const user = await UserModel.findBy(_id)

        if (!user) {
            throw new Error("User not found")
        }

        next()
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = userAuth