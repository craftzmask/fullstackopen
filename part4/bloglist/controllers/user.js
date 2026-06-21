const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  // Implementation for login
  const { username, name, password } = req.body;
  if (!(username && password)) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters long" });
  }

  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  }

  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).json({ error: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    name,
    password: passwordHash,
  });

  const a = await newUser.save();

  res.status(201).json({ message: "User created successfully" });
});

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = router;
