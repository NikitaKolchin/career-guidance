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

db.questionnaires = require("./questionnaire.model.js")(sequelize, Sequelize)
db.questions = require("./question.model.js")(sequelize, Sequelize)
db.users = require("./user.model.js")(sequelize, Sequelize)

db.questionnaires.hasMany(db.questions);
module.exports = db
