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
    dialectModule: require("pg"),
    dialect: config.dialect,
  }
);
// Function to test database connection
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful.");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
};
module.exports = { sequelize, connectDatabase };
