const mongoose = require("mongoose");

const length = process.argv.length;

if (length !== 3 && length !== 5) {
  console.error("Wrong arguments");
  process.exit(1);
}

const password = process.argv[2];

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://khanhchung:${password}@cluster0.la8qjkr.mongodb.net/phonebook`,
    { family: 4 },
  )
  .then(() => {
    console.log("Connected to MongoDb successfully");
  })
  .catch((error) => {
    console.error(error);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (length === 3) {
  Person.find({})
    .then((result) => {
      console.log("Phonebook:");
      result.forEach((p) => console.log(`${p.name} ${p.number}`));
      mongoose.connection.close();
    })
    .catch((error) => console.error(error));
}

if (length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new Person({ name, number });

  newPerson
    .save()
    .then((result) => {
      console.log(`Added ${result.name} ${result.number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((error) => console.error(error));
}
