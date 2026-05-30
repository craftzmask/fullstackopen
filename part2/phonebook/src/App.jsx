import { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./components/SearchFilter";
import AddPersonForm from "./components/AddPersonForm";
import PersonList from "./components/PersonList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredPersons = persons.filter(({ name }) => {
    return name.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === name)) {
      alert(`${name} is already added to phonebook`);
      return;
    }

    axios
      .post("http://localhost:3000/persons", { name, number })
      .then((response) => {
        setPersons(persons.concat(response.data));
        setName("");
        setNumber("");
      });
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
