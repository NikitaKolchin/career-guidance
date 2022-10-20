const express = require("express")
const app = express()
const passport = require("passport")
const passportConfig = require("./app/passport")
const session = require("express-session")
const exphbs = require("express-handlebars")

// const cors = require("cors");
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require("./app/models")
// db.sequelize.sync()

 // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use(passport.initialize())
app.use(passport.session())

passportConfig.createStrategy(passport)
passport.serializeUser(passportConfig.serializeUser)
passport.deserializeUser(passportConfig.deserializeUser)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to career guidance application." })
})

//For Handlebars
app.set("views", "./app/views/")
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: false,
    layoutsDir: "./app/views/layouts/",
  })
)
app.set("view engine", ".hbs")

require("./app/routes/questionnaire.routes")(app)
require("./app/routes/question.routes")(app)
require("./app/routes/user.routes")(app)
require("./app/routes/variant.routes")(app)
require("./app/routes/answer.routes")(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
