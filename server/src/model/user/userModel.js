const User = require("./userSchema");

const getUserByEmail = (email) => {
    if (!email) return false;

    return User.findOne({ email }).then((user) => { return user }).catch(err => {return err})
}

module.exports = { getUserByEmail }