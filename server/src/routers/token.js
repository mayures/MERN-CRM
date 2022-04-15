const express = require("express");
const {verifyRefreshToken} = require("../../helpers/jwt.helper");
const { deleteJWT } = require("../../helpers/redis.helper");
const User = require("../model/user/userSchema");
const router = express.Router();
const jwt = require("jsonwebtoken")


router.get("/", async (req, res) => {
    const { authorisation } = req.headers;

    const id = await verifyRefreshToken(authorisation);
    if (id.user) {

        const userProf = await User.findOne({ "_id": id.user })
        if (userProf._id) {
            let tokenExpiry = userProf.refreshJWT.addedAt
            const dbrefreshtoken = userProf.refreshJWT.token

            tokenExpiry = tokenExpiry.setDate(tokenExpiry.getDate() + +process.env.JWT_REFRESH_JEY_EXPIRY_DATE)

            const today = new Date()

            if (dbrefreshtoken !== authorisation && tokenExpiry < today) {
                res.status(200).json({ message: "validated" })
            }

            const accessJWT = await jwt.sign({ user: id.user }, process.env.jwt_refresh_token, { expiresIn: '15m' })

            return res.json({ message: "success", accessJWT })
        }
    } else {
        res.status(404).json({ message: "forbidden" })
    }
})


module.exports = router