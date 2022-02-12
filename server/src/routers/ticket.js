const express = require('express');
const userAuthorisation = require('../../middleware/auth.middleware');
const { insertTicket, findTicketUser } = require('../model/ticket/ticket.model');
const Ticket = require('../model/ticket/ticket.schema');
const router = express.Router()

router.post('/', userAuthorisation, async (req, res) => {

    try {
        const { subject, sender, message } = req.body;

        const userId = req.userId

        const ticketObj = {
            clientId: userId,
            subject,
            conversations: [{
                sender,
                message
            }]
        }

        const result = await insertTicket(ticketObj);

        if (result._id) {
            return res.json({ message: "ticket added successfully", result })
        }

        return res.json({ message: "error" })

    } catch (error) {
        res.json(error.message)
    }

})

router.get("/", userAuthorisation, async (req, res) => {

    const userId = req.userId;

    const result = await findTicketUser(userId)

    res.json(result)
})

module.exports = router