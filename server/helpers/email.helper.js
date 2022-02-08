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

const emailProcessor = (email, pin) => {
    const info = {
        from: `"CRM Company Inc." <toby.heller78@ethereal.email>`,
        to: "mayuresh42@gmail.com",
        subject: "password reset pin",
        text: "hello there",
        html: `<span>hello there here is your pin: <h1>${pin}</h1></span>`
    }

    send(info)
}

module.exports = { emailProcessor }