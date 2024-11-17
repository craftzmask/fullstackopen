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
  }

  next(err)
}

const unknownEndpoint = (req, res) => {
  res.status(404).json({
    error: 'unknown endpoint'
  })
}

module.exports = {
  errorHandler, unknownEndpoint
}