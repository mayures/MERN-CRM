const express = require('express')
const router = express.Router()

router.all('/', (req, res) => {
    res.send("hello there")
})

module.exports = router