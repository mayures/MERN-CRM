const RandomGenerator = require("../../utils/randomGen");
const ResetPin = require("./ResetPin.schema");

const setPasswordResetPin = async (email) => {

    const resetPin = await RandomGenerator(6)

    const resetObj = {
        email,
        pin: resetPin
    }

    return new Promise((resolve, reject) => {
        new ResetPin(resetObj).save().then(data => { resolve(data) }).catch(err => { resolve(false); reject(err) })
    })
}

const getPinbyEmailPin = (email, pin) => {
    return new Promise(async (resolve, reject) => {
        await ResetPin.findOne({ email, pin }).then(data => { resolve(data) }).catch(err => { reject(err) })
    })
}

const deletePin = async (email) => {
    return await ResetPin.deleteMany({ email }).catch(err => { return err })
}

module.exports = { setPasswordResetPin, getPinbyEmailPin, deletePin }