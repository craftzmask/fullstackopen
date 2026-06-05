const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, { family: 4 })
  .then(() => {
    console.log("Connected to MongoDb successfully");
  })
  .catch((error) => {
    console.error(error);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name required"],
    minLength: 3,
  },
  number: {
    type: String,
    required: [true, "User phone number required"],
    minLength: 8,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
