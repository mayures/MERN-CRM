const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'toby.heller78@ethereal.email',
        pass: 'XYmhPV2zyrgEQjWmFd'
    }
})

const send = async (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await transporter.sendMail(info);

            console.log("Message sent is: %s", result.messageId)

            console.log("Preview URI is: %s", nodemailer.getTestMessageUrl(result))

            resolve(result)
        } catch (error) {
            reject(error)
        }
    })

}

const emailProcessor = ({ type, email, pin }) => {
    switch (type) {
        case "request-new-password":
            let info = {
                from: `"CRM Company Inc." <toby.heller78@ethereal.email>`,
                to: email,
                subject: "password reset pin",
                text: `hello there, hello there here is your pin: ${pin}`,
                html: `<span>hello there here is your pin: <h1>${pin}</h1></span>`
            }

            send(info)
            break;

        case "password-update-success":
            let infoChange = {
                from: `"CRM Company Inc." <toby.heller78@ethereal.email>`,
                to: email,
                subject: "password change is successfull",
                text: "hello there your password change is successfull",
                html: `<span>your password change is successfull</span>`
            }

            send(infoChange)
            break;

        default:
            break;
    }
}

module.exports = { emailProcessor }