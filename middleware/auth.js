const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    try {

        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, `${process.env.SECRET_KEY}`)
            req.userId = user.id;
        }
        else {
            res.status(500).json({ message: "Not a valid user" })
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized User" })

    }
}

module.exports = auth;