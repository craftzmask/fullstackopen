const mongoose = require('mongoose')

const length = process.argv.length
if (length !== 3 && length !== 5) {
  console.log('wrong format')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://khanhchung:${password}@cluster0.la8qjkr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (length === 3) {
  console.log('phonebook:')
  Person.find({})
    .then(data => {
      data.forEach(p =>
        console.log(`${p.name} ${p.number}`)
      )
      mongoose.connection.close()
    }) 
}

if (length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({ name, number })
  person.save().then(data => {
    console.log(`Added ${data.name} number ${data.number} to phonebook`)
    mongoose.connection.close()
  })
}