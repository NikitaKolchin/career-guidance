const dbConfig = require("../config")

const Sequelize = require("sequelize")
const pool = dbConfig.get("pool")
const sequelize = new Sequelize(dbConfig.get("DB"), dbConfig.get("USER"), dbConfig.get("PASSWORD"), {
  host: dbConfig.get("HOST"),
  dialect: dbConfig.get("dialect"),
  define: {
    timestamps: false
  },
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.questionnaires = require("./questionnaire.model")(sequelize, Sequelize)
db.questions = require("./question.model")(sequelize, Sequelize)
db.users = require("./user.model")(sequelize, Sequelize)
db.variants = require("./variant.model")(sequelize, Sequelize)
db.answers = require("./answer.model")(sequelize, Sequelize)

db.questionnaires.hasMany(db.questions)
db.questions.belongsTo(db.questionnaires)

db.questions.hasMany(db.variants)
db.variants.belongsTo(db.questions)

db.users.hasMany(db.answers)
db.answers.belongsTo(db.users)

db.questions.hasMany(db.answers)
db.answers.belongsTo(db.questions)

db.variants.hasMany(db.answers)
db.answers.belongsTo(db.variants)


// db.users.belongsToMany(db.variants, {through: db.answers})
// db.users.belongsToMany(db.variants, {through: db.answers})
// db.variants.belongsToMany(db.users, {through: db.answers})

// db.users.belongsToMany(db.questions, {through: db.answers})
// db.questions.belongsToMany(db.users, {through: db.answers})

module.exports = db
