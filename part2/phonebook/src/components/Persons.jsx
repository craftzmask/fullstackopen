import React from 'react'

const Persons = ({ persons }) => (
  <div>
    {persons.map(p =>
      <Person key={p.name} person={p} />
    )}
  </div>
)

const Person = ({ person }) => (
  <div key={person.name}>
    {person.name} {person.number}
  </div>
)

export default Persons