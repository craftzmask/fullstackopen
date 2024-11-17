const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', {
  transform: (document, user) => {
    user.id = user._id.toString()
    delete user._id
    delete user.__v
    delete user.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)