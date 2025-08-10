const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  logger.error(error)
  
  const { name } = error
  if (name === 'CastError') {
    return response.status(400).json({ error: 'Malformed ID' })
  } else if (name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  return response.status(404).json({ error: 'unknown endpoint' })
}

module.exports = { errorHandler, unknownEndpoint }
