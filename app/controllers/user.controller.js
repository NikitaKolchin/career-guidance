const db = require("../models")
const User = db.users
const Op = db.Sequelize.Op
const {sendConfirmationEmail} = require("../mailer")
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.name) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a User
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  }

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      })
    })
}

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username
  var condition = username
    ? { username: { [Op.iLike]: `%${username}%` } }
    : null

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      })
    })
}

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id,
      })
    })
}

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        })
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      })
    })
}

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        })
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      })
    })
}

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      })
    })
}


exports.signup = function (req, res) {
  res.render("signup")
}

exports.signin = function (req, res) {
  res.render("signin")
}

exports.account =async function  (req, res) {
  const users = await User.findAll({ where: { password: { [Op.ne]: null } } })
  // const currentUser = 
  console.dir(req.user)
  // console.log(users[0].dataValues.email)
  res.render("account", {currentUser: req.user, users})
}

exports.verify = async (req, res) => {
  if (!req.params.confirmationCode) {
    const confirmationCode = Buffer.from(req.user?.email).toString('base64')
    sendConfirmationEmail(req.user?.username, req.user?.email ,confirmationCode)
    res.render("verify")
  }
  else {
    const email = Buffer.from(req.params.confirmationCode, 'base64').toString('ascii')
    const user = await User.findOne({where:{ email, "status":"inactive"} })
    if(!user) return
    user.status = "active"
    await user.save()
    res.redirect("/")
  }
}

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/")
  })
}
