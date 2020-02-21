module.exports = app => {
    const sections = require("../controllers/sections.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", sections.create);
  
    // Retrieve all sections
    router.get("/", sections.findAll);
  
    // Retrieve all published sections
    router.get("/published", sections.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", sections.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", sections.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", sections.delete);
  
    // Create a new Tutorial
    router.delete("/", sections.deleteAll);
  
    app.use("/api/sections", router);
  };