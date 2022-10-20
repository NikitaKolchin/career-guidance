module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answer", {
        graid: {
            type: Sequelize.INTEGER,
        },
    })
   
    return Answer
  }