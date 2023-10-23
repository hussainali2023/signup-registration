require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

app.use(express.json())

const userRoutes = require("./routes/userRoutes");


// app.use((req, res, next) => {
//     console.log("HTTP Method - " + req.method + ", URL -" + req.url);
//     next();
// })

app.use("/user", userRoutes)




app.get("/", (req, res) => {
    res.send("Server is running properly")
})

// mongoose.connect(`${process.env.DB_URL}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

mongoose.connect(`${process.env.DB_URL}`)
    .then(() => {
        console.log("Mongoose Connected Successfully");
    })
    .catch((error) => { console.log(error); })

app.listen(5000, () => {
    console.log("Server is running on port: 5000");
})