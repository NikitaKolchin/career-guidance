const LocalStrategy = require("passport-local").Strategy
const User = require("./models").users
const bCrypt = require("bcryptjs")
exports.createStrategy = function (passport) {
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, done) {
        const isValidPassword = (userpass, password) =>
          bCrypt.compareSync(password, userpass)
        const user = await User.findOne({ where: { email } })
        if (!user) {
          return done(null, false)
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: "Incorrect password.",
          })
        }
        return done(null, user)
      }
    )
  )

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        const generateHash = (password) => {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)
        }
        const user = await User.findOne({ where: { email } })
        if (user) {
          return done(null, false, {
            message: "That email is already taken",
          })
        }
        const userPassword = generateHash(password)
        const newUser = await User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          password: userPassword,
          email,
        })
        console.log(newUser)
        if (!newUser) {
          return done(null, false)
        }
        if (newUser) {
          return done(null, newUser)
        }
      }
    )
  )
}

exports.deserializeUser = async function (id, done) {
  const user = await User.findByPk(id)
  if (!user) {
    return done(null, false)
  }
  return done(null, user)
}

exports.serializeUser = function (user, done) {
  done(null, user.id)
}

// exports.isLoggedIn =  function (req, res, next) {
//   if (req.isAuthenticated()) return next()
//   res.redirect("/api/users/signin")
// }

exports.verifyAuthStatus =  function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.get("status")==="active") 
      return next()
    else 
      res.redirect("/api/users/verify")
  }
  else
    res.redirect("/api/users/signin")
}