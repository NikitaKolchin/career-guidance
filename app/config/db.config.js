module.exports = {
  HOST: "psql-suse",
  USER: "postgres",
  PASSWORD: "qwasdx=1",
  DB: "guidance",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
