module.exports = (sequelize, Sequelize) => {
    const Machine = sequelize.define("Machine", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        name: Sequelize.STRING
      },
      rev1: {
        type: Sequelize.BOOLEAN
      },
      rev2: {
        type: Sequelize.BOOLEAN
      },
      frasspinn: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
    
      visible: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Machine;
  };