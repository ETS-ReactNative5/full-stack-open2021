import React from 'react'
import Blog from './Blog'
import jwt_decode from 'jwt-decode'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const compare = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    return 0
  }
  const sortedBlogs = [...blogs].sort(compare)
  const token_decoded = jwt_decode(user.token)

  const userBlogs = sortedBlogs.map((blog) => {
    if (blog.user) {
      if (blog.user.id === token_decoded.id) {
        return blog
      }
    }
    return null
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='container mx-auto'>
      {userBlogs.map(blog => (
        blog !== null
          ? <div key={blog.id} style={blogStyle} className='blog'>
           <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
          : ''
      ))}
    </div>
  )
}

export default BlogList