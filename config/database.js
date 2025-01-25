const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // This is required for Neon DB
      },
    },
    dialect: config.dialect,
  }
);
module.exports = sequelize;
