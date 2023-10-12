const mongoose = require("mongoose");
const { Schema, model } = mongoose

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const User = model("UserDetails", UserSchema)
module.exports = User;