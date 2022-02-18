import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, userLogged, clearLocStor }) => {
  return (
    <div>
    <button onClick={clearLocStor}>log out</button>
    <h2>blogs</h2>
        <p>{userLogged.name} logged in</p>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default BlogList