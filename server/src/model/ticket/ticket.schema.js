const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId
    },
    subject: {
        type: String,
        max: 100,
        required: true,
        default: ''
    },
    openAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        max: 30,
        required: true,
        default: "pending response from the operator"
    },
    conversations: [{
        sender: {
            type: String,
            maxlength:50,
            required: true,
            default:""
        },
        message: {
            type: String,
            max: 1000,
            required: true,
            default: ""
        },
        msgAt:{
            type:Date,
            require:true,
            default:Date.now()
        }
    }]
})

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = Ticket