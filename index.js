require("dotenv").config()
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect(`mongodb://localhost:27017/userData`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.get("/", (req, res) => {
    res.send("server is running properly")
})

const routes = require("./routes/mainRoute")
app.use("/api", routes)

app.listen(5000, () => {
    console.log("Server is running on PORT-5000");
})