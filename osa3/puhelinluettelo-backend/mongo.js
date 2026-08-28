const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const run = async () => {
  await mongoose.connect(url)

  if (process.argv.length === 3) {
    const persons = await Person.find({})
    console.log('phonebook:')
    persons.forEach(person => console.log(person.name, person.number))
  } else {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })
    await person.save()
    console.log(`added ${person.name} number ${person.number} to phonebook`)
  }

  await mongoose.connection.close()
}

run()
