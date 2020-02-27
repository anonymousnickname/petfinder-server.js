
module.exports = (sequelize, Sequelize) => {
    const Announcement = sequelize.define("announcement", {
      announcement_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      created_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: 'user', // <<< Note, its table's name, not object name
        referencesKey: 'user_id' // <<< Note, its a column name
  }

    }, {
      freezeTableName: true,
      timestamps: false
    });
  
    return Announcement;
  };