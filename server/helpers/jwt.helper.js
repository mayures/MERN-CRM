const jwt = require("jsonwebtoken");

const verifyRefreshToken = async (userJWT) => {

    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.jwt_refresh_token))
    } catch (error) {
        return Promise.resolve(error)
    }
}

const verifyAccessToken = async (userJWT) => {

    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.jwt_access_token))
    } catch (error) {
        return Promise.resolve(error)
    }
}

module.exports = {verifyRefreshToken, verifyAccessToken}