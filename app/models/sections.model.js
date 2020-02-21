module.exports = (sequelize, Sequelize) => {
    const Sections = sequelize.define("sections", {
      sections_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      freezeTableName: true,
      timestamps: false
    });
  
    return Sections;
  };