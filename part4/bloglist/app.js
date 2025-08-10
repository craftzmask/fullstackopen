const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const { info } = require('./utils/logger')
const { MONGODB_URI } = require('./utils/config')
const {
  errorHandler,
  unknownEndpoint,
  tokenExtractor
} = require('./utils/middleware')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

info('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => info('Connected to MongoDB'))
  .catch((exception) => error(exception.message))

app.use(express.json())
app.use(morgan('tiny'))

app.use(tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
