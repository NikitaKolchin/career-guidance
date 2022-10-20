const db = require("../models")
const Variant = db.variants
const Op = db.Sequelize.Op

// Create and Save a new Variant
exports.create = (req, res) => {

  
  // Save Variant in the database
  Variant.create({...req.body})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Variant.",
      })
    })
}

// Retrieve all Variants from the database.
exports.findAll = (req, res) => {
  Variant.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving variants.",
      })
    })
}

// Find a single Variant with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Variant.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Variant with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Variant with id=" + id,
      })
    })
}

// Update a Variant by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Variant.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Variant was updated successfully.",
        })
      } else {
        res.send({
          message: `Cannot update Variant with id=${id}. Maybe Variant was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Variant with id=" + id,
      })
    })
}

// Delete a Variant with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Variant.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Variant was deleted successfully!",
        })
      } else {
        res.send({
          message: `Cannot delete Variant with id=${id}. Maybe Variant was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Variant with id=" + id,
      })
    })
}

// Delete all Variants from the database.
exports.deleteAll = (req, res) => {
  Variant.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Variants were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all variants.",
      })
    })
}