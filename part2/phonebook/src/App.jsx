import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keySearch, setKeySearch] = useState('')
  
  const filteredPersons = persons.filter(p => {
    const name = p.name.toLowerCase()
    return name.includes(keySearch.toLowerCase())
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = persons.find(p => p.name === newName)
    if (found) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({
      name: newName, number: newNumber
    }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={keySearch}
        onChange={(e) => setKeySearch(e.target.value)}
      />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        number={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} />
    </div>
  )
}

export default App