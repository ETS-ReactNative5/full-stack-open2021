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
        url: 'https://twitter.com',
        likes: 10,
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const allBlogsTitle = allBlogs.map(note => note.title)
    expect(allBlogsTitle).toContain('Test 3')
})

test('Blog entry has no like property defined', async () => {
    const newPost = {
        title: 'Test 4',
        author: 'Sophia',
        url: 'https://twitter.com',
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const allBlogs = await helper.blogsInDb()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
    
        const lastBlog = allBlogs.filter(blog => blog.title === 'Test 4')
        expect(lastBlog[0].likes).toBe(0)
})

test('Missing title', async () => {
    const newPost = {
        author: 'Bob',
        url: 'https://twitter.com',
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(400)
})

test('Missing url', async () => {
    const newPost = {
        title: 'Test 5',
        author: 'Bob',
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(400)
})

test('Check if a blog post is successfully deleted', async() => {
    const initialPosts = await helper.blogsInDb()
    const postToDelete = initialPosts[0]

    await api
        .delete(`/api/blogs/${postToDelete.id}`)
        .expect(204)

    const postsAtEnd = await helper.blogsInDb()
    expect(postsAtEnd).toHaveLength(initialPosts.length - 1)

})

test('Check if I can update a blog post', async() => {
    const initialPosts = await helper.blogsInDb()
    const postToUpdate = initialPosts[0]
    const newPost = {
        title: 'Test Update',
        author: 'Bob',
        url: 'https://facebook.com',
        likes: 20,
    }

    await api
        .put(`/api/blogs/${postToUpdate.id}`)
        .send(newPost)
        .expect(200)
    
    const finalPosts = await helper.blogsInDb()
    console.log(finalPosts);
    expect(finalPosts[0].title).toBe('Test Update')
})

afterAll(() => {
    mongoose.connection.close()
})
