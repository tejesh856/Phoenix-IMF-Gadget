const { validationResult } = require("express-validator");
const User = require("../db/models/user");
const { generateToken } = require("../Utils/authToken");
const bcrypt = require("bcryptjs");
const createHttpError = require("http-errors");

//signup controller
const signup = async (req, res, next) => {
  //validating fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const groupedErrors = errors.array().reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = [];
      }
      acc[error.path].push(error.msg);
      return acc;
    }, {});

    return res.status(400).json({ success: false, errors: groupedErrors });
  }
  try {
    const { name, email, password } = req.body;

    //check if user with email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw createHttpError(
        400,
        "User with this email already exists. Please log in."
      );
    }

    //create new user
    const newUser = await User.create({ name, email, password });
    if (!newUser) {
      throw createHttpError(500, "User registration failed. Please try again.");
    }

    //send response
    res.json({
      success: true,
      message: "Sign up successfull",
    });
  } catch (error) {
    next(error);
  }
};

//login controller
const login = async (req, res, next) => {
  //validating fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const groupedErrors = errors.array().reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = [];
      }
      acc[error.path].push(error.msg);
      return acc;
    }, {});

    return res.status(400).json({ success: false, errors: groupedErrors });
  }
  try {
    const { email, password } = req.body;

    //check if user with email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw createHttpError(
        401,
        "User with this email does not exist. Please sign up."
      );
    }

    //compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw createHttpError(401, "Invalid password. Please try again.");
    }

    //generate token
    const token = await generateToken(user.id);

    //send response
    res.json({
      success: true,
      message: "Login successfull",
      token,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { signup, login };
