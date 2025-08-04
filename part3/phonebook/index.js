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
  const person = req.body
  if (!(person.name && person.number)) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  }

  if (persons.find(p => p.name === person.name)) {
    return res.status(400).json({
      error: 'name is already taken'
    })
  }

  person.id = Math.floor(Math.random() * 1000000).toString()
  persons.push(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
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