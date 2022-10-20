const dbConfig = require("../config")

const Sequelize = require("sequelize")
const pool = dbConfig.get("pool")
const sequelize = new Sequelize(dbConfig.get("DB"), dbConfig.get("USER"), dbConfig.get("PASSWORD"), {
  host: dbConfig.get("HOST"),
  dialect: dbConfig.get("dialect"),
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
db.questions.hasMany(db.variants)
db.users.belongsToMany(db.variants, {through: db.answers})
db.variants.belongsToMany(db.users, {through: db.answers})
// db.questions.hasMany(db.variants); //belongs to many??
module.exports = db
