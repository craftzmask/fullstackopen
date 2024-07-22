import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [textSearch, setTextSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
  }, [])

  const filtedPersons = persons.filter(p => {
    const name = p.name.toLowerCase()
    return name.includes(textSearch.toLowerCase())
  })

  const handleSubmit = e => {
    e.preventDefault()
    const found = persons.find(p => p.name === name)
    if (found) {
      alert(`${name} is already added to phonebook`)
    } else {
      axios
        .post('http://localhost:3001/persons', { name, number })
        .then(res => {
          setPersons(persons.concat(res.data))
          setName('')
          setNumber('')
        })
    }
  }

  const handleNameChange = e => setName(e.target.value)

  const handleNumberChange = e => setNumber(e.target.value)

  const handleTextSearchChange = e => setTextSearch(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={textSearch}
        onChange={handleTextSearchChange} />

      <h2>add a new</h2>
      <PersonForm
        name={name}
        onNameChange={handleNameChange}
        number={number}
        onNumberChange={handleNumberChange}
        onSubmit={handleSubmit} />

      <h2>Numbers</h2>
      <Persons persons={filtedPersons} />
    </div>
  )
}

export default App