const logger = require('./logger')

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'malformatted id'
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