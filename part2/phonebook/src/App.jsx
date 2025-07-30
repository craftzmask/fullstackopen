import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keySearch, setKeySearch] = useState('')
  
  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(res => setPersons(res.data))
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
    axios
      .post("http://localhost:3001/persons", personObject)
      .then(res => {
        setPersons(persons.concat(res.data))
        setNewName('')
        setNewNumber('')
      })
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