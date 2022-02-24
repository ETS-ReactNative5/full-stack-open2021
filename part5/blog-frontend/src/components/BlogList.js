import React from 'react'
import Blog from './Blog'
import jwt_decode from 'jwt-decode'

const BlogList = ({ blogs, updateLike, user, deleteBlogPost }) => {

  const compare = (a, b) => {
    if (a.likes < b.likes) {
      return 1
    }
    if (a.likes > b.likes) {
      return -1
    }
    return 0
  }
  const sortedBlogs = blogs.sort(compare)
  const token_decoded = jwt_decode(user.token)

  const userBlogs = sortedBlogs.map((blog) => {
    if (blog.user) {
      if (blog.user.id === token_decoded.id) {
        return blog
      }
    }
    return null
  })
  return (
    <div>
      {userBlogs.map(blog => (
        blog !== null 
        ? <div key={blog.id}>
          <Blog key={blog.id} blog={blog} updateLike={updateLike} user={user} deleteBlogPost={deleteBlogPost}/>
        </div>
        : ''
      ))}
    </div>
  )
}

export default BlogList