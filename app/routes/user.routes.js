const { isActive } = require("../strategy")

module.exports = (app) => {
  const users = require("../controllers/user.controller.js")
  // const isLoggedIn = require("../strategy").isLoggedIn
  const verifyAuthStatus = require("../strategy").verifyAuthStatus
  const passport = require("passport")
  var router = require("express").Router()
  router.get("/", users.findAll)

  router.get("/signup", users.signup)
  router.get("/signin", users.signin)
  router.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/api/users/verify",
      failureRedirect: "/api/users/signup",
    })
  )
  router.get("/verify", users.verify)
  router.get("/account", verifyAuthStatus, users.account)
  router.get("/logout", users.logout)
  router.post( 
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/api/users/account",
      failureRedirect: "/api/users/signin",
    })
  )


  // router.post("/passworded", passport.authenticate('local-signin',{ session: false }), users.findAllPassworded);
  // // router.post("/auth", users.auth);

  // router.post(
  //   "/signin",
  //   passport.authenticate("local-signin", {session: true}),
  //   (req, res) => {
  //     res.send({done:"done"})}
  // )

  router.get("/verify/:confirmationCode", users.verify)

  router.post("/", users.create)

  router.get("/:id", users.findOne)

  router.put("/:id", users.update)

  router.delete("/:id", users.delete)

  router.delete("/", users.deleteAll)

  app.use("/api/users", router)
}
