const { verifyAccessToken } = require("../helpers/jwt.helper");
const { getJWT, deleteJWT } = require("../helpers/redis.helper");

const userAuthorisation = async (req,res,next)=>{
    const { authorisation } = req.headers;
    const data = await verifyAccessToken(authorisation)
    console.log(data)

    if (data.user) {
        const userId = await getJWT(authorisation);
        if (!userId) {
           return res.status(403).json({ message: "forbidden" })
        }
        req.userId = userId;
        return next()
    } else {
        deleteJWT(authorisation);
        return res.status(403).json({ message: "forbidden" })
    }
}

module.exports = userAuthorisation