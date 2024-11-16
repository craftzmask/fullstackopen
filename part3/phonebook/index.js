require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(data => res.json(data))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const person = new Person({ ...req.body })
  person.save()
    .then(data => res.json(data))
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = { ...req.body }
  Person
    .findByIdAndUpdate(req.params.id, person, {
      new: true,
      runValidators: true,
      context: 'query'
    })
    .then(data => res.json(data))
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

app.get('/info', (req, res) => {
  Person.find({})
    .then(data => {
      res.send(`
        <p>Phonebook has info for ${data.length} people</p>
        <p>${new Date()}</p>
      `)
    })
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'malformatted id'
    })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: err.message
    })
  }
  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})