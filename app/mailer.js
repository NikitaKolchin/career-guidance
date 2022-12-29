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
        subject: "Пожалуйста, подтвердите свой аккаунт",
        html: `<h2>Привет, ${name}</h2>
            <p>Спасибо за подписку, пожалуйста подтвердите свой e-mail, перейдя по следующей ссылке</p>
            <a href=http://career-guidance.cf/api/users/verify/${confirmationCode}> Кликните сюда</a>
            </div>`,
    }).catch(err => console.log(err))
}