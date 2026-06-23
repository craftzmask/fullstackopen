const jwt = require("jsonwebtoken");
const User = require("../models/user");

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: "Unknow endpoint",
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).send({
      error: err.message,
    });
  }

  next(err);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({
      error: "Token invalid",
    });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({
      error: "User does not exist",
    });
  }

  request.user = user;

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
