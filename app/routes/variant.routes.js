module.exports = (app) => {
  const variants = require("../controllers/variant.controller")

  var router = require("express").Router()

  // Create a new Variant
  router.post("/", variants.create)

  // Retrieve all Variants
  router.get("/", variants.findAll)

  // Retrieve a single Variant with id
  router.get("/:id", variants.findOne)

  // Update a Variant with id
  router.put("/:id", variants.update)

  // Delete a Variant with id
  router.delete("/:id", variants.delete)

  // Delete all Variants
  router.delete("/", variants.deleteAll)

  app.use("/api/variants", router)
}
