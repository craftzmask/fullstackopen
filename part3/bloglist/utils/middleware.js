const logger = require('./logger')

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'malformatted id'
    })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message
    })
  } else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({
      error: 'username must be unique'
    })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }

  next(err)
}

const unknownEndpoint = (req, res) => {
  res.status(404).json({
    error: 'unknown endpoint'
  })
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }
  next()
}

module.exports = {
  errorHandler, unknownEndpoint, tokenExtractor
}