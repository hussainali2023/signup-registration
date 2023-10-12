const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const User = require("../model/authentication");

exports.signup = async (req, res) => {

    try {

        const { password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ ...req.body, password: hashedPassword })

        const token = await jwt.sign(user.id, process.env.JWT_SECRET_KEY)

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),

        }

        res.cookie("myToken", token, options).status(200).json({ success: true, message: "Account Created Successfully" })

    }
    catch (error) {
        res.status(500).json({ success: true, message: error.message })

    }

};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all the required fields" });
        }

        const user = await User.findOne({ email });
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not Found" })
        }

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Wrong password" });
        }

        const token = await jwt.sign(user.id, process.env.JWT_SECRET_KEY);

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        };

        res.cookie("myToken", token, options).status(200).json({ success: true, user, message: "User Login Successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.loggedInUserDetails = (req, res) => {
    if (req.user) {
        // User is logged in, return the user details
        res.status(200).json({ success: true, user: req.user });
    } else {
        // User is not logged in
        res.status(401).json({ success: false, message: "Not logged in" });
    }
};


exports.logout = async (req, res) => {
    try {
        const options = {
            expires: new Date(Date.now()),
        }

        res.cookie('myToken', null, options).status(200).json({ success: true, message: "Logout Successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

