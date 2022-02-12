const User = require("./userSchema");

const getUserByEmail = (email) => {
    if (!email) return false;

    return User.findOne({ email }).then((user) => { return user }).catch(err => { return err })
}

const updatePassword = async (email, password) => {
    return await User.findOneAndUpdate({ "email": email }, { $set: { "password": password } }, { new: true }).then(data => { return data }).catch(err => { return err })
}

const emptyUserRefreshJWT = async (_id, token) => {
    await User.findOneAndUpdate({ _id }, { $set: { "refreshToken.token": token } }, { new: true }).then(data => { return data }).catch(err => { return err })
}

module.exports = { getUserByEmail, updatePassword, emptyUserRefreshJWT }