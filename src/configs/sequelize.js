const { Sequelize } = require("sequelize");
const dbConfig = require("./database");
const config = dbConfig["development"];

const sequelize = new Sequelize(
  config.connection.database,
  config.connection.user,
  config.connection.password,
  {
    host: config.connection.host,
    dialect: "mysql",
    logging: false,
  },
);

module.exports = sequelize;
