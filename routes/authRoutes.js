const { signup, login } = require("../controllers/authController");
const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const validateSignup = [
  check("name").notEmpty().withMessage("Name is required"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];
const validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];
router.route("/signup").post(validateSignup, signup);
router.route("/login").post(validateLogin, login);
module.exports = router;
