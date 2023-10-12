const express = require("express");
const router = express.Router()
const authUserController = require("../controller/userAuth");
const { isAuthenticateUser } = require("../middleware/user");

router.post("/signup", authUserController.signup)
router.post("/login", authUserController.login)
router.get("/my-details", isAuthenticateUser, authUserController.loggedInUserDetails);
router.get("/logout", authUserController.logout)

module.exports = router;