module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("question", {
    title: {
      type: Sequelize.STRING,
    },
    group: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    hasVariants: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    isMultiple: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  })
 
  return Question
}
