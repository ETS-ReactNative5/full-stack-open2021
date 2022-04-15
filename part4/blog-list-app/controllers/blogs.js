const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const blog = require('../models/blog')
const mongoose = require('mongoose')

blogsRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const userTokenized = request.body.user
    const userDecoded = jwt_decode(userTokenized.token)
    const userDB = await User.findById(userDecoded.id)

    if(!body.title || !body.url) {
        return response.status(400).json({
            error: 'title or url missing'
        })
    }
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: !body.likes ? 0 : body.likes,
        comments: [],
        user: userDB._id
    })

    const savedBlog = await blog.save()

    userDB.blogs = userDB.blogs.concat(savedBlog._id)
    await userDB.save()

    response.status(201).json(savedBlog)
   
})

blogsRouter.delete('/:id', async (request, response) => {
    const userId = request.body.source.user
    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() === userId.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({
            error: 'permission denied to delete the blog entry'
        })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const newPost = {
        ...body,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedPost = await Blog.findByIdAndUpdate(request.params.id, newPost, {new: true})
    response.json(updatedPost)
})

blogsRouter.put('/:id/comments', async (request, response) => {
    const body = request.body
    const newPost = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: body.comments
    }
    const updatedPost = await Blog.findByIdAndUpdate(request.params.id, newPost, {new: true})

    response.json(updatedPost)
})

module.exports = blogsRouter