const mongoose = require("mongoose")

const resetPinSchema = new mongoose.Schema({
    pin: {
        type: String,
        maxlength: 6,
        minlength: 6
    },
    email: {
        type: String,
        maxlength: 50,
        required: true
    },
    addedAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const ResetPin = mongoose.model("Pin", resetPinSchema)

module.exports = ResetPin