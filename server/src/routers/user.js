const express = require('express');
const User = require('../model/userModel');
const router = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { setJWT, getJWT } = require('../../helpers/redis.helper');
const saltRounds = 10


router.post('/', async (req, res) => {

    const { name, company, address, phone, email, password } = req.body;

    if (!email || !password || !phone || !company || !name) {
        return res.json({ status: "fail", message: "fill the complete form" })
    }

    const existUser = await User.findOne({ email })
    if (existUser) {
        return res.json({ status: "fail", message: "email already exists" })
    }

    const passwordHash = await bcrypt.hashSync(password, saltRounds)
    const user = new User({ name, company, address, phone, email, password: passwordHash });

    await user.save().then((user) => {
        console.log(user);
        res.json({ message: "new user created", user })
    }).catch(err => {
        console.log(err)
        res.json({ status: "fail", message: err.message })
    })
})

router.post("/login", async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ status: "fail", message: "please provide email and the password" })
    }

    const existUser = await User.findOne({ email })
    if (!existUser) {
        return res.json({ status: "fail", message: "plaease provide the valid email" })
    }

    console.log(existUser._id + "\n\n")

    const passwordCorrect = await bcrypt.compareSync(password, existUser.password)
    if (!passwordCorrect) {
        return res.json({ status: "fail", message: "email or password inocorrect" })
    }

    const accessToken = await jwt.sign({
        user: existUser._id
    }, process.env.jwt_access_token, {
        expiresIn: "15m"
    })

    await setJWT(accessToken, existUser._id)

    const refreshToken = await jwt.sign({
        user: existUser._id
    }, process.env.jwt_refresh_token, {
        expiresIn: "30d"
    })

    await User.findOneAndUpdate({ "_id": existUser._id }, { $set: { "refreshJWT.token": refreshToken, "refreshJWT.addedAt": Date.now() } }, { new: true }).then((res) => {
        console.log(res)
    }).catch(err => console.error(err))

    console.log(accessToken);
    console.log(refreshToken);
})

module.exports = router