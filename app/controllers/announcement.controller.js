const db = require("../models");
const announcementSequelize = db.announcements;
const Op = db.Sequelize.Op;

// Create and Save a new announcement
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a announcement
  const announcement = {
    announcement_id: req.body.announcement_id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    price: req.body.price,
    created_date: Date.now(),
    location: req.body.location,
    user_id: req.body.user_id,
    sections_id: req.body.sections_id,
    images: req.body.images
  };

  // Save announcement in the database
  announcementSequelize.create(announcement, {
    include : [{
            model : db.images,
            as : 'images'
        }
    ]
})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the announcement."
      });
    });
};

// Retrieve all announcements from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  announcementSequelize.findAll({ where: condition, include: [db.images, db.sections]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving announcements."
      });
    });
};

// Find a single announcement with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  announcementSequelize.findByPk(id, {
    include : [{
            model : db.images,
            as : 'images'
        }
    ]
})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving announcement with id=" + id
      });
    });
};

// Update a announcement by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  announcementSequelize.update(req.body, {
    where: { announcement_id: id },
    include : [{
      model : db.images,
      as : 'images'
  }]
   
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "announcement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update announcement with id=${id}. Maybe announcement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating announcement with id=" + id
      });
    });
};

// Delete a announcement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  announcementSequelize.destroy({
    where: { announcement_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "announcement was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete announcement with id=${id}. Maybe announcement was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete announcement with id=" + id
      });
    });
};

// Delete all announcements from the database.
exports.deleteAll = (req, res) => {
  announcementSequelize.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} announcements were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all announcements."
      });
    });
};

// find all published announcement
exports.findAllPublished = (req, res) => {
  announcementSequelize.findAll({ where: {status: "VERIFY"}, include: [db.images, db.sections] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving announcements."
      });
    });
};

exports.findAllCanceled = (req, res) => {
  announcementSequelize.findAll({ where: {status: "CANCEL"}, include: [db.images, db.sections] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving announcements."
      });
    });
};

exports.findAllUnPublished = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  announcementSequelize.findAll({ where: condition, where: {status: "NOT_VERIFY"}, include: [db.images, db.sections]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving announcements."
      });
    });
};