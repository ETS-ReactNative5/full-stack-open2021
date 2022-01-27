const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_list_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogsObject = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogsObject.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('Blog list app returns the correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('There is a property called id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})
