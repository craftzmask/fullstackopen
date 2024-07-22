import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [textSearch, setTextSearch] = useState('')

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
      setPersons(persons.concat({ name, number }))
      setName('')
      setNumber('')
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