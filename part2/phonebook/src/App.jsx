import { useState } from 'react'

import Filter from './components/FIlter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')

  const personsToShow = persons.filter(p => {
    const name = p.name.toLowerCase()
    return name.includes(search.toLowerCase())
  })

  const handleSubmit = e => {
    e.preventDefault()
    if (persons.find(p => p.name === name)) {
      alert(`${name} is already in the phonebook`)
    } else {
      setPersons(persons.concat({ name, number }))
      setName('')
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