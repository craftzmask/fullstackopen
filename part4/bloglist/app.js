const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const { unknownEndpoint, errorHandler } = require("./utils/middleware");

const app = express();

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/user");

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info("Connected to MongoDB"))
  .catch((e) => logger.error(e.message));

app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
