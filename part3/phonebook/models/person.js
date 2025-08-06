const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected'))
  .catch(() => console.error('Error: cannot connect to db'))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (v) => /^\d{2,3}-\d{6,}$/.test(v),
      message: props => `${props.value} is not a valid number!`
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Person', personSchema)