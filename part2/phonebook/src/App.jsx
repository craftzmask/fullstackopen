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
      <div>
        filter shown with
        <input
          value={search}
          onChange={e => setSearch(e.target.value)} />
      </div>
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
      {personsToShow.map(p =>
        <div key={p.name}>{p.name} {p.number}</div>
      )}
    </div>
  )
}

export default App