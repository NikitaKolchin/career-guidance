const db = require("../models")
const Answer = db.answers
const Op = db.Sequelize.Op

// Create and Save a new Answer
exports.create = (req, res) => {

  Answer.create({...req.body})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Answer.",
      })
    })
}

// Retrieve all Answers from the database.
exports.findAll = (req, res) => {
  Answer.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving answers.",
      })
    })
}

// Find a single Answer with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Answer.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Answer with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Answer with id=" + id,
      })
    })
}

// Update a Answer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Answer.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Answer was updated successfully.",
        })
      } else {
        res.send({
          message: `Cannot update Answer with id=${id}. Maybe Answer was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Answer with id=" + id,
      })
    })
}

// Delete a Answer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Answer.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Answer was deleted successfully!",
        })
      } else {
        res.send({
          message: `Cannot delete Answer with id=${id}. Maybe Answer was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Answer with id=" + id,
      })
    })
}

// Delete all Answers from the database.
exports.deleteAll = (req, res) => {
  Answer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Answers were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all answers.",
      })
    })
}