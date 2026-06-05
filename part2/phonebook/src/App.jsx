import { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./components/SearchFilter";
import AddPersonForm from "./components/AddPersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const filteredPersons = persons.filter(({ name }) => {
    return name.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const notify = (message, type) => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification("");
      setNotificationType("");
    }, 5000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const foundPerson = persons.find((person) => person.name === name);
    if (foundPerson) {
      if (
        confirm(
          `${name} is already added to phonebook, replace old number with the new one?`,
        )
      ) {
        personService
          .update({ ...foundPerson, number })
          .then((returnedData) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedData.id ? returnedData : person,
              ),
            );
            setName("");
            setNumber("");
            notify(`Updated ${returnedData.name}`, "success");
          })
          .catch(() => {
            setPersons(
              persons.filter((person) => person.id !== foundPerson.id),
            );
            notify(`Info of ${foundPerson.name} has been deleted`, "error");
          });
      }
      return;
    }

    personService
      .add({ name, number })
      .then((returnedData) => {
        setPersons(persons.concat(returnedData));
        setName("");
        setNumber("");
        notify(`Added ${returnedData.name}`, "success");
      })
      .catch((error) => notify(error.response.data.error, "error"));
  };

  const handleDeleteClick = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter(({ id }) => id !== person.id));
        notify(`Deleted ${person.name}`, "success");
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
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
