module.exports = (sequelize, Sequelize) => {
  const Questionnaire = sequelize.define("questionnaire", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.ENUM("simple", "choise", "graded"),
      defaultValue: "simple",
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  })

  return Questionnaire
}
