const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;




db.user = require("./user.model.js")(sequelize, Sequelize);
db.sections = require("./sections.model.js")(sequelize, Sequelize);
db.images = require("./images.model.js")(sequelize, Sequelize);
db.announcements = require("./announcement.model.js")(sequelize, Sequelize);

module.exports = db;

db.user.hasMany(db.announcements, {foreignKey: 'user_id'});
db.announcements.belongsTo(db.user, {foreignKey: 'user_id'});

db.announcements.hasMany(db.images, {foreignKey: 'announcement_id'});
db.images.belongsTo(db.announcements, {foreignKey: 'announcement_id'});

db.announcements.belongsTo(db.sections, {foreignKey: 'sections_id'});