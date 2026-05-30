import { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./components/SearchFilter";
import AddPersonForm from "./components/AddPersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredPersons = persons.filter(({ name }) => {
    return name.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === name)) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    personService.add({ name, number }).then((returnedData) => {
      setPersons(persons.concat(returnedData));
      setName("");
      setNumber("");
    });
  };

  const handleDeleteClick = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter(({ id }) => id !== person.id));
      });
    }
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
      <PersonList persons={filteredPersons} onDeleteClick={handleDeleteClick} />
    </div>
  );
};

export default App;
