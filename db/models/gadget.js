"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
module.exports = sequelize.define(
  "Gadget",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Available", "Deployed", "Destroyed", "Decommissioned"],
      allowNull: false,
    },
    codename: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
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
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    paranoid: true,
    modelName: "Gadget",
    freezeTableName: true,
  }
);
