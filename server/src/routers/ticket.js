const express = require("express");
const userAuthorisation = require("../../middleware/auth.middleware");
const {
  createNewTicketValid,
  replyValid,
} = require("../../middleware/formValidation.helper");
const {
  insertTicket,
  findTicketUser,
  findOneTicket,
  pushMessage,
  closeTicket,
  deleteTicket,
} = require("../model/ticket/ticket.model");
const router = express.Router();

router.post("/", userAuthorisation, createNewTicketValid, async (req, res) => {
  try {
    const { subject, sender, message } = req.body;

    const userId = req.userId;

    const ticketObj = {
      clientId: userId,
      subject,
      conversations: [
        {
          sender,
          message,
        },
      ],
    };

    const result = await insertTicket(ticketObj);

    if (result._id) {
      return res.json({
        status: "success",
        message: "ticket added successfully",
      });
    }

    return res.json({ status: "error", message: "Unable to add the ticket" });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.get("/", userAuthorisation, async (req, res) => {
  try {
    const userId = req.userId;

    const result = await findTicketUser(userId);

    if (result) return res.json(result);

    return res.json({
      status: "error",
      message: "user ticket cannot be found",
    });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

router.get("/:tId", userAuthorisation, async (req, res) => {
  try {
    const ticketId = req.params.tId;
    const userId = req.userId;
    const result = await findOneTicket(ticketId, userId);

    if (result) {
      return res.json(result);
    }
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

router.put("/:tId", userAuthorisation, replyValid, async (req, res) => {
  try {
    const { message, sender } = req.body;

    const ticketId = req.params.tId;
    const result = await pushMessage(ticketId, message, sender);

    if (result._id) {
      return res.json({ result, message: "Your Message Has Been Updated" });
    }

    res.json({
      status: "error",
      message: "Unable to update your message please try again later",
    });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

router.patch("/close-ticket/:tId", userAuthorisation, async (req, res) => {
  try {
    const tId = req.params.tId;
    const userId = req.userId;
    const result = await closeTicket(tId, userId);
    if (result._id) {
      res.json({ result, message: "ticket closed successfully" });
    }
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

router.delete("/delete-ticket/:tId", userAuthorisation, async (req, res) => {
  try {
    const tId = req.params.tId;
    const userId = req.userId;
    await deleteTicket(tId, userId);

    return res.json({ message: "ticket deleted successfully" });
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
