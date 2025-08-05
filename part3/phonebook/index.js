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

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
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

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
})

app.get('/info', (req, res) => {
  res.send(
    `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${Date()}</p>
    `
  )
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Listenning to port ${PORT}`)
})