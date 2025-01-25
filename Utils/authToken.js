const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const generateToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_EXPIRES_IN },
      (err, token) => {
        if (err)
          reject(
            createError.InternalServerError("Error generating access token")
          );

        resolve(token);
      }
    );
  });
};
module.exports = { generateToken };
