module.exports = (sequelize, Sequelize) => {
    const Images = sequelize.define("images", {
      images_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      announcement_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      freezeTableName: true,
      timestamps: false
    });
    return Images;
  };