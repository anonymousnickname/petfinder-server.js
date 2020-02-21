const db = require("../models");
const sectionsSequelize = db.sections;
const Op = db.Sequelize.Op;

// Create and Save a new sections
exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a sections
  const sections = {
    sections_id: req.body.sections_id,
    name: req.body.name
  };

  // Save sections in the database
  sectionsSequelize.create(sections)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the sections."
      });
    });
};

// Retrieve all sections from the database.
exports.findAll = (req, res) => {

  sectionsSequelize.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sections."
      });
    });
};

// Find a single sections with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  sectionsSequelize.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving sections with id=" + id
      });
    });
};

// Update a sections by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  sectionsSequelize.update(req.body, {
    where: { sections_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "sections was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update sections with id=${id}. Maybe sections was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating sections with id=" + id
      });
    });
};

// Delete a sections with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  sectionsSequelize.destroy({
    where: { sections_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "sections was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete sections with id=${id}. Maybe sections was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete sections with id=" + id
      });
    });
};

// Delete all sections from the database.
exports.deleteAll = (req, res) => {
  sectionsSequelize.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} sections were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sections."
      });
    });
};

// find all published sections
exports.findAllPublished = (req, res) => {
  sectionsSequelize.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sections."
      });
    });
};