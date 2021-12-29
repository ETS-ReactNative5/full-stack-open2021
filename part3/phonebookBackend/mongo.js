const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)

} 

const nameDb = 'phonebook-app'
const password = process.argv[2]
const url = `mongodb+srv://fed_fullstackopen:${password}@cluster0.rrvn7.mongodb.net/${nameDb}?retryWrites=true&w=majority`

mongoose.connect(url)

let name = ''
let number = ''

if (process.argv.length === 3) {
    name = ''
    number = ''
} else {
    name = process.argv[3]
    number = process.argv[4]
}

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = new mongoose.model('Person', personSchema);

const person = new Person({
    name: name,
    number: number
})

if (process.argv.length === 3) {  
    Person.find({}).then(persons => {
        console.log('Phonebook:');
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close();
        process.exit(1)
    })
} else if (process.argv.length === 5) {
    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`);
        mongoose.connection.close()
    })
} else if (process.argv.length < 6) {
    console.log('Missing information');
    process.exit(1)

} 



