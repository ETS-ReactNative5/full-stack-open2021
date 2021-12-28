const express = require('express')
const res = require('express/lib/response')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
// app.use(morgan('tiny'))

morgan.token('content', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens['content'](req, res),
      ].join(' ')
}))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const personsLength = persons.length
    const date = new Date();
    response.send(`<div>Phonebook has info for ${personsLength} people</div> <div>${date}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id) 

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * (100000 - 1) + 1)
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing information'
        })
    }
    
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing information'
        })
    }

    const newPerson = {
        id: id,
        name: body.name,
        number: body.number,
        date: new Date(),
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

app.put('/api/persons', (request, response) => {
    console.log('done put');
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})