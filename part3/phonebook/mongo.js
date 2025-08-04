const mongoose = require('mongoose')

const n = process.argv.length

if (n !== 3 && n !== 5) {
  console.error('Invalid arguments')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://khanhchung:${password}@cluster0.la8qjkr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose
  .connect(url)
  .then(() => console.log('connected'))
  .catch(() => console.error('Error: cannot connect to db'))

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (n === 3) {
  Person.find({}).then(data => {
    console.log('phonebook:')
    data.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (n === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number })

  person.save().then(data => {
    console.log(`added ${data.name} ${data.number} to phonebook`)
    mongoose.connection.close()
  })
}