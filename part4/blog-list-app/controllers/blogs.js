const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({})
    response.json(blogs)
    
    // Blog.find({})
    // .then(blogs => {
    //     response.json(blogs)
    // })
    // .catch((error) => {
    //     response.status(400).send({ error: 'No blog entries '})
    // })
})

blogsRouter.post('/', async (request, response) => {

    const requestContent = request.body

    if(!requestContent.title || !requestContent.url) {
        return response.status(400).json({
            error: 'title or url missing'
        })
    }

    if (!requestContent.likes) {
        const newBody = {
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: 0
        }
        const blog = new Blog(newBody)
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } else {
        const blog = new Blog(request.body)
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
    // blog.save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const newPost = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedPost = await Blog.findByIdAndUpdate(request.params.id, newPost, {new: true})
    response.json(updatedPost)
})

module.exports = blogsRouter