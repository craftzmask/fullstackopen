const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require("./utils/middleware");
const path = require("path");

const app = express();

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info("Connected to MongoDB"))
  .catch((e) => logger.error(e.message));

app.use(express.json());

app.use(tokenExtractor);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/testing");
  app.use("/api/testing", testRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
