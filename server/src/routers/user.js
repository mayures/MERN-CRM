const express = require('express');
const User = require('../model/userModel');
const router = express.Router();

router.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save().then((user) => {
        console.log(user);
        res.json({ message: "new user created", user })
    }).catch(err => {
        console.log(err)
        res.json({ status:"fail", message: err.message })
    })
})



module.exports = router