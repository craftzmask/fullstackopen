import { useEffect, useState, useRef } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keySearch, setKeySearch] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const timeoutIdRef = useRef(null)
  
  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
  }, [])

  const filteredPersons = persons.filter(p => {
    const name = p.name.toLowerCase()
    return name.includes(keySearch.toLowerCase())
  })

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const found = persons.find(p => p.name === newName)
    if (found) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update({ ...found, number: newNumber })
          .then(data => {
            setPersons(persons.map(p => p.id !== data.id ? p : data))
            resetForm()
            notify(`Added ${data.name}'s number`, 'success')
          })
          .catch(() => {
            setPersons(persons.filter(p => p.id !== found.id))
            resetForm()
            notify(`Information of ${found.name} has been removed from server`, 'error')
          })
      }
    } else {
      const personObject = { name: newName, number: newNumber }
      personService.create(personObject)
        .then(data => {
          setPersons(persons.concat(data))
          resetForm()
          notify(`Added ${data.name}`, 'success')
        })
    }
  }

  const handleDeleteClick = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService.remove(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          notify(`Deleted ${person.name}`, 'success')
        })
    }
  }

  const notify = (message, status) => {
    setMessage(message)
    setStatus(status)

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    timeoutIdRef.current = setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        status={status}
      />

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