const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

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

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'Invalid token'
    })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({
      error: 'User ID is invalid'
    })
  }

  request.user = user

  next()
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,userExtractor 
}
