const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Test 1',
        author: 'Federico',
        url: 'https://google.com',
        likes: 5
    },
    {
        title: 'Test 2',
        author: 'Cristina',
        url: 'https://amazon.com',
        likes: 8
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }