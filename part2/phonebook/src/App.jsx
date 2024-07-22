import { useState } from 'react'

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
      <div>
        filter shown with <input
        value={textSearch} onChange={handleTextSearchChange} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input
            value={name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input
            value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtedPersons.map(p =>
        <div key={p.name}>{p.name} {p.number}</div>
      )}
    </div>
  )
}

export default App