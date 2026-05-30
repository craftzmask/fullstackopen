import { useState } from "react";
import SearchFilter from "./components/SearchFilter";
import AddPersonForm from "./components/AddPersonForm";
import PersonList from "./components/PersonList";

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
      <SearchFilter
        value={searchKeyword}
        onChange={(event) => setSearchKeyword(event.target.value)}
      />

      <h2>add a new</h2>
      <AddPersonForm
        onSubmit={handleSubmit}
        nameValue={name}
        onNameChange={(event) => setName(event.target.value)}
        numberValue={number}
        onNumberChange={(event) => setNumber(event.target.value)}
      />

      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} />
    </div>
  );
};

export default App;
