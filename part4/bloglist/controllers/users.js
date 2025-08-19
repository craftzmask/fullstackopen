const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.get("/", async (request, response, next) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

userRouter.get("/:id", async (request, response, next) => {
  const user = await User.findById(request.params.id).populate("blogs");
  response.json(user);
});

userRouter.post("/", async (request, response, next) => {
  const { username, password, name } = request.body;

  if (password.length < 3) {
    return response.status(400).json({
      error: "Password must be at least 3 characters long",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
    name,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = userRouter;
