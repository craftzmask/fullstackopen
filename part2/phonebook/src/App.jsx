import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const found = persons.find(p => p.name === name)
    if (found) {
      alert(`${name} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name }))
      setName('')
    }
  }

  const handleNameChange = e => setName(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input
            value={name} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>{person.name}</div>
      )}
    </div>
  )
}

export default App