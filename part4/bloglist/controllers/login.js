const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/", async (request, response) => {
  const { username, password } = request.body;
  if (!(username && password)) {
    return response.status(401).json({
      error: "Missing username or password",
    });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return response.status(404).json({
      error: "User does not exist",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    console.log("password not corrected");
    return response.status(401).json({
      error: "Password does not match",
    });
  }

  const userForToken = {
    username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  response.json({
    token,
    id: user._id.toString(),
    username: user.username,
    name: user.name,
  });
});

module.exports = router;
