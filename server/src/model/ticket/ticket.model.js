const Ticket = require("./ticket.schema");

const insertTicket = (ticketObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Ticket(ticketObj).save().then(data => {
                resolve(data)
            }).catch(err => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const findTicketUser = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Ticket.find({ clientId: _id }).then(data => resolve(data)).catch(err => reject(err))
        } catch (error) {
            reject(error.message)
        }
    })
}

const findOneTicket = (_id, clientId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Ticket.findOne({ _id, clientId }).then(data => resolve(data)).catch(err => reject(err))
        } catch (error) {
            reject(error.message)
        }
    })
}

const pushMessage = (_id, clientId, message, sender) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Ticket.findOneAndUpdate({ _id, clientId }, { $push: { conversations: { message, sender } } }, { new: true }).then(data => {
                resolve(data)
            }).catch(err => { reject(err) })
        } catch (error) {
            reject(error.message)
        }
    })
}

const closeTicket = (_id, clientId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Ticket.findOneAndUpdate({ _id, clientId }, { $set: { status: "ticket closed" } }, { new: true }).then(data => resolve(data)).catch(err => reject(err))
        } catch (error) {
            reject(error.message)
        }
    })
}

const deleteTicket = (_id, clientId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Ticket.findOneAndDelete({ _id, clientId }).then(data => resolve(data)).catch(err => reject(err))
        } catch (error) {
            reject(error.message)
        }
    })
}

module.exports = {
    insertTicket,
    findTicketUser,
    findOneTicket,
    pushMessage,
    closeTicket,
    deleteTicket
}