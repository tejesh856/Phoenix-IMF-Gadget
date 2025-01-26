"use strict";
const { Model, Sequelize } = require("sequelize");
const { sequelize } = require("../../config/database");
const bcrypt = require("bcryptjs");
const gadget = require("./gadget");

const User = sequelize.define(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hash);
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    modelName: "User",
  }
);
User.hasMany(gadget, { foreignKey: "createdBy" });
gadget.belongsTo(User, { foreignKey: "createdBy" });
module.exports = User;
