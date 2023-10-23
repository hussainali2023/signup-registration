const mongoose = require("mongoose");

const UserVerificationSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    uniqueString: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("UserVerification", UserVerification)