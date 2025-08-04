const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected'))
  .catch(() => console.error('Error: cannot connect to db'))


const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

module.exports = mongoose.model('Person', personSchema)