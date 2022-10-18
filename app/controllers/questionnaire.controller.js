const db = require("../models")
const Questionnaire = db.questionnaires
const Op = db.Sequelize.Op

// Create and Save a new Questionnaire
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    })
    return
  }

  // Create a Questionnaire
  const questionnaire = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : true,
  }

  // Save Questionnaire in the database
  Questionnaire.create(questionnaire)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Questionnaire.",
      })
    })
}

// Retrieve all Questionnaires from the database.
exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null

  Questionnaire.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questionnaires.",
      })
    })
}

// Find a single Questionnaire with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Questionnaire.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Questionnaire with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Questionnaire with id=" + id,
      })
    })
}

// Update a Questionnaire by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Questionnaire.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Questionnaire was updated successfully.",
        })
      } else {
        res.send({
          message: `Cannot update Questionnaire with id=${id}. Maybe Questionnaire was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Questionnaire with id=" + id,
      })
    })
}

// Delete a Questionnaire with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Questionnaire.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Questionnaire was deleted successfully!",
        })
      } else {
        res.send({
          message: `Cannot delete Questionnaire with id=${id}. Maybe Questionnaire was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Questionnaire with id=" + id,
      })
    })
}

// Delete all Questionnaires from the database.
exports.deleteAll = (req, res) => {
  Questionnaire.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Questionnaires were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all questionnaires.",
      })
    })
}

// find all published Questionnaire
exports.findAllPublished = (req, res) => {
  Questionnaire.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questionnaires.",
      })
    })
}
