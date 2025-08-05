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
  Person.find({}).then(data => res.json(data))
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
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  if (!(name && number)) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  }

  const person = new Person({ name, number })
  person.save().then(data => res.json(person))
})

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  )
  .then(data => res.json(data))
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  Person.find({}).then(data => {
    return res.send(
      `
        <p>Phonebook has info for ${data.length} people</p>
        <p>${Date()}</p>
      `
    )
  })
})

const unknownRoute = (req, res) => {
  return res.status(404).json({
    error: 'unknown route'
  })
}

const errorHandler = (error, req, res, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    return res.status(400).json({
      error: 'malformatted id'
    })
  }

  next(error)
}

app.use(unknownRoute)
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listenning to port ${PORT}`)
})