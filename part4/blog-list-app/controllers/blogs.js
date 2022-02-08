const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const requestContent = request.body
    let user = ''

    if (!requestContent.userId){
        user = await User.findOne()
    } else {
        user = await User.findById(requestContent.userId)
    }


    if(!requestContent.title || !requestContent.url) {
        return response.status(400).json({
            error: 'title or url missing'
        })
    }
    
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: !requestContent.likes ? 0 : requestContent.likes,
        user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
   
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