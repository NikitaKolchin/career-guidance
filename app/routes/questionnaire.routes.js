module.exports = (app) => {
  const questionnaires = require("../controllers/questionnaire.controller.js")

  var router = require("express").Router()

  // Create a new Tutorial
  router.post("/", questionnaires.create)

  // Retrieve all Tutorials
  router.get("/", questionnaires.findAll)

  // Retrieve all published Tutorials
  router.get("/published", questionnaires.findAllPublished)

  // Retrieve a single Tutorial with id
  router.get("/:id", questionnaires.findOne)

  // Update a Tutorial with id
  router.put("/:id", questionnaires.update)

  // Delete a Tutorial with id
  router.delete("/:id", questionnaires.delete)

  // Delete all Tutorials
  router.delete("/", questionnaires.deleteAll)

  app.use("/api/questionnaires", router)
}
