const jwt = require("jsonwebtoken")
const userSchema = require("../model/authentication")

exports.isAuthenticateUser = async (req, res, next) => {
    try {
        const { myToken } = req.cookies;

        if (!myToken) {
            return res.status(401).json({ success: false, message: "Please login" })
        }

        const decodedData = await jwt.verify(myToken, process.env.JWT_SECRET_KEY)

        const user = await userSchema.findById(decodedData)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        req.user = user;
        next()
    }
    catch (error) {
        res.status(500).json({ success: true, message: error.message })
    }
}