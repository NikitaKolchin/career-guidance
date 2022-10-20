module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("question", {
    title: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    }, 
    chapter: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  })
 
  return Question
}
