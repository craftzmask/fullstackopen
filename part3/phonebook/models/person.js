const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://khanhchung:khanhchung@cluster0.la8qjkr.mongodb.net/phonebook`,
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

module.exports = mongoose.model("Person", personSchema);
