const express = require("express");
const app = express();
const dotenv = require("dotenv");
const createError = require("http-errors");
const authRoutes = require("./routes/authRoutes");
const gadgetRoutes = require("./routes/gadgetRoutes");
dotenv.config({ path: `${process.cwd()}/.env` });
const { connectDatabase } = require("./config/database");
const PORT = process.env.PORT || 4000;

app.use(express.json());
connectDatabase()
  .then(() => {
    // all routes
    app.get("/", (req, res) => {
      res.json({ success: "true", message: "Hello World" });
    });

    //auth routes
    app.use("/api/v1/auth", authRoutes);

    //gadget routes
    app.use("/api/v1/gadgets", gadgetRoutes);

    //route not found
    app.use(async (req, res, next) => {
      next(createError.NotFound());
    });

    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err.message);
    process.exit(1);
  });
