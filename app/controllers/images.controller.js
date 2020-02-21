const db = require("../models");
const imagesSequelize = db.images;
const Op = db.Sequelize.Op;

// Create and Save a new images
exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a images
  const images = {
    images_id: req.body.images_id,
    image: req.body.image,
  };

  // Save images in the database
  imagesSequelize.create(images)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the images."
      });
    });
};

// Retrieve all images from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  imagesSequelize.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving images."
      });
    });
};

// Find a single images with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  imagesSequelize.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving images with id=" + id
      });
    });
};

// Update a images by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  imagesSequelize.update(req.body, {
    where: { images_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "images was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update images with id=${id}. Maybe images was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating images with id=" + id
      });
    });
};

// Delete a images with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  imagesSequelize.destroy({
    where: { images_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "images was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete images with id=${id}. Maybe images was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete images with id=" + id
      });
    });
};

// Delete all images from the database.
exports.deleteAll = (req, res) => {
  imagesSequelize.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} images were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all images."
      });
    });
};

// find all published images
exports.findAllPublished = (req, res) => {
  imagesSequelize.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving images."
      });
    });
};