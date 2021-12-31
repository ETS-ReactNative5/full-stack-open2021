const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

const mongoUrl = ''
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB: ', error)
    })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

app.get('/api/blogs', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch((error) => {
            response.status(400).send({ error: 'No blog entries '})
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog.save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

