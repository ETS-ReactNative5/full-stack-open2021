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

test('Create a new blog entry', async () => {
    const newPost = {
        title: 'Test 3',
        author: 'Sophia',
        'url': 'https://twitter.com',
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allNotes = await helper.blogsInDb()
    expect(allNotes).toHaveLength(helper.initialBlogs.length + 1)

    const allNotesContent = allNotes.map(note => note.title)
    expect(allNotesContent).toContain('Test 3')
})

afterAll(() => {
    mongoose.connection.close()
})
