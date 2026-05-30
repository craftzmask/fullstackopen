import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredPersons = persons.filter(({ name }) => {
    return name.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === name)) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ id: persons.length + 1, name, number }));
    setName("");
    setNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
        />
      </div>

      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(({ id, name, number }) => (
        <div key={id}>
          {name} {number}
        </div>
      ))}
    </div>
  );
};

export default App;
