const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const correctPassword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && correctPassword)) {
    return response.status(401).json({
      error: "username or password is invalid",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
