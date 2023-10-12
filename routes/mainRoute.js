const router = require("express").Router()
const authUserRoutes = require("./userRoutes")

router.use("/user", authUserRoutes)

module.exports = router;