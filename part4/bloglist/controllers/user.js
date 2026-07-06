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

  const savedUser = await newUser.save();

  res.status(201).json(savedUser);
});

router.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { user: 0 });
  res.json(users);
});

module.exports = router;
