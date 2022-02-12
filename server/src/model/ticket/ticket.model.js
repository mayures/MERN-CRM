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

module.exports = {
    insertTicket,
    findTicketUser
}