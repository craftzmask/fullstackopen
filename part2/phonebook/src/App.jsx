import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [textSearch, setTextSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const filtedPersons = persons.filter(p => {
    const name = p.name.toLowerCase()
    return name.includes(textSearch.toLowerCase())
  })

  const handleSubmit = e => {
    e.preventDefault()
    const found = persons.find(p => p.name === name)
    if (found) {
      if (confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update({ ...found, number })
          .then(updatedPerson => {
            setPersons(persons.map(p =>
              p.id !== updatedPerson.id ? p : updatedPerson
            ))
            setName('')
            setNumber('')
            notify(`Updated ${updatedPerson.name}`, 'success')
          })
      }
    } else {
      personService.create({ name, number })
        .then(savedPerson => {
          setPersons(persons.concat(savedPerson))
          setName('')
          setNumber('')
          notify(`Added ${savedPerson.name}`, 'success')
        })
    }
  }

  const handleDeleteClick = person => {
    if (confirm(`Delete ${person.name}?`)) {
      personService.remove(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          notify(`Deleted ${person.name}`, 'success')
        })
    }
  }

  const notify = (message, style) => {
    setMessage(message)
    setStyle(style)

    setTimeout(() => {
      setMessage(null)
      setStyle(null)
    }, 5000)
  }

  const handleNameChange = e => setName(e.target.value)

  const handleNumberChange = e => setNumber(e.target.value)

  const handleTextSearchChange = e => setTextSearch(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} style={style} />

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
      <Persons
        persons={filtedPersons}
        onDelete={handleDeleteClick} />
    </div>
  )
}

export default App