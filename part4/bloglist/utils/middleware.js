const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  logger.error(error)
  
  const { name } = request
  if (name === 'CastError') {
    return response.status(400).json({ error: 'malformed id' })
  } else if (name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  return response.status(404).json({ error: 'unknown endpoint' })
}

module.exports = { errorHandler, unknownEndpoint }
