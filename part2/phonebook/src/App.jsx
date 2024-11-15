import { useState } from 'react'

import Filter from './components/FIlter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import { useEffect } from 'react'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
  }, [])

  const personsToShow = persons.filter(p => {
    const name = p.name.toLowerCase()
    return name.includes(search.toLowerCase())
  })

  const handleSubmit = e => {
    e.preventDefault()
    if (persons.find(p => p.name === name)) {
      alert(`${name} is already in the phonebook`)
    } else {
      const personObject = { name, number }
      personService
        .createPerson(personObject)
        .then(data => {
          setPersons(persons.concat(data))
          setName('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={search}
        onChange={e => setSearch(e.target.value)} />

      <h2>add a new</h2>
      <PersonForm 
        onSubmit={handleSubmit}
        name={name}
        onNameChange={e => setName(e.target.value)}
        number={number}
        onNumberChange={e => setNumber(e.target.value)} />

      <h2>Numbers</h2>
      <PersonList persons={personsToShow}/>
    </div>
  )
}

export default App