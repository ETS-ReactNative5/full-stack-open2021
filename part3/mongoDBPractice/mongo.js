const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)
}

const nameDb = 'note-app'
const password = process.argv[2]
const url = `mongodb+srv://fed_fullstackopen:${password}@cluster0.rrvn7.mongodb.net/${nameDb}?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'Cannot wait to be a fullstack developer',
    date: new Date(),
    important: false,
})
// Saving a new note inside the DB

// note.save().then(result => {
//     console.log('Note saved!');
//     mongoose.connection.close()
// })

Note.find({ important:true }).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close();
})