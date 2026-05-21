const path = require("path");

module.exports = {
  development: {
    client: "mysql2",
    dialect: "mysql",
    connection: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "my-express",
    },
    migrations: {
      directory: path.join(__dirname, "../database/migrations"),
      tableName: "migrations",
    },
    seeds: {
      directory: path.join(__dirname, "../database/seeds"),
    },
  },
};
