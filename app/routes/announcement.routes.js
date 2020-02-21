module.exports = app => {
  const announcement = require("../controllers/announcement.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", announcement.create);

  // Retrieve all announcement
  router.get("/", announcement.findAll);

  // Retrieve all published announcement
  router.get("/published", announcement.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", announcement.findOne);

  // Update a Tutorial with id
  router.put("/:id", announcement.update);

  // Delete a Tutorial with id
  router.delete("/:id", announcement.delete);

  // Create a new Tutorial
  router.delete("/", announcement.deleteAll);

  app.use("/api/announcement", router);
};