const express = require('express')
const router = express.Router()

router.all('/', (req, res) => {
    res.send("hello from user")
})

module.exports = router