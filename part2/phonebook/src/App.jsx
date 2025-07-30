import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keySearch, setKeySearch] = useState('')
  
  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
  }, [])

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

    const personObject = { name: newName, number: newNumber }
    personService.create(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDeleteClick = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService.remove(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
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
      <PersonList
        persons={filteredPersons}
        onDelete={handleDeleteClick}
      />
    </div>
  )
}

export default App