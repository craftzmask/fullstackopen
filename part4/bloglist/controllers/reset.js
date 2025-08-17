const resetRoute = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

resetRoute.post("/", async (request, response, next) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  response.status(204).end();
});

module.exports = resetRoute;
