const nodemailer = require("nodemailer")
const config = require("./config") 

const user = config.get("mailer_user")
const pass = config.get("mailer_pass")

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {user, pass},
})
module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:3000/api/users/verify/${confirmationCode}> Click here</a>
            </div>`,
    }).catch(err => console.log(err))
}