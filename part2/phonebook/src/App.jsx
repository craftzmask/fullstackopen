import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

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
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            value={name}
            onChange={e => setName(e.target.value)} />
        </div>
        <div>
          number:
          <input
            value={number}
            onChange={e => setNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p =>
        <div key={p.name}>{p.name} {p.number}</div>
      )}
    </div>
  )
}

export default App