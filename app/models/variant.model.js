module.exports = (sequelize, Sequelize) => {
    const Variant = sequelize.define("variant", {
      title: {
        type: Sequelize.STRING,
      },
      graid: {
        type: Sequelize.INTEGER,
      }, 
      description: {
        type: Sequelize.STRING,
      }
    })
   
    return Variant
  }