import React from 'react'

const Persons = ({ persons, onDelete }) => (
  <div>
    {persons.map(p =>
      <Person key={p.name} person={p} onDelete={onDelete} />
    )}
  </div>
)

const Person = ({ person, onDelete }) => (
  <div key={person.name}>
    {person.name} {person.number}
    <button onClick={() => onDelete(person)}>
      delete
    </button>
  </div>
)

export default Persons