const Joi = require("joi");

const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
const pin = Joi.string().min(6).max(6).required()
const newPassword = Joi.string().alphanum().required().min(3).max(30)

const resetPassValid = (req, res, next) => {
    const schema = Joi.object({ email })

    const value = schema.validate(req.body);

    if (value.error) {
        return res.json({ status: "error", message: value.error.message })
    }

    next();
}

const updatePassValid = (req, res, next) => {
    const schema = Joi.object({ email, newPassword, pin })

    const value = schema.validate(req.body)

    if (value.error) {
        return res.json({ status: "error", message: value.error.message })
    }

    next();
}

module.exports = { resetPassValid, updatePassValid }