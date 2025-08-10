const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [3, 'The username must be at least 3 characters long'],
    required: [true, 'The username cannot be empty'],
    unique: [true, 'The username has been taken']
  },
  passwordHash: {
    type: String,
    required: [true, 'The password cannot be empty'],
  },
  name: String
})

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  } 
})

module.exports = mongoose.model('User', userSchema)