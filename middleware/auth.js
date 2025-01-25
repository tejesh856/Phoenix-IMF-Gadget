const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../db/models/user");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Ensure the token exists and is in the correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createError(401, "No access token provided or token format is incorrect")
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token and get the payload
    const payload = jwt.verify(token, process.env.ACCESS_SECRET);

    // Check if user exists in the database
    const user = await User.findByPk(payload.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Attach the payload to the request object
    req.payload = payload;
    next();
  } catch (err) {
    const message =
      err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
    return next(createError(401, message));
  }
};

module.exports = { verifyToken };
