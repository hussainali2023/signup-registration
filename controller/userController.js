
const userModel = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already registered" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const userDetails = await userModel.create({
            name: name,
            email: email,
            password: hashPassword
        })

        const token = jwt.sign({ email: userDetails.email, id: userDetails._id }, `${process.env.SECRET_KEY}`)
        res.status(201).json({ user: userDetails, token: token })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })

    }

}


const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" })
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Password" })
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, `${process.env.SECRET_KEY}`);
        res.status(201).json({ user: existingUser, token: token })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}



module.exports = { signin, signup }