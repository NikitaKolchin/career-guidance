module.exports = (sequelize, Sequelize) => {
  const Questionnaire = sequelize.define("questionnaire", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  })

  return Questionnaire
}
