import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateLike, user }) => {

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

  return (
    <div>
      {sortedBlogs.map(blog => (
        <div key={blog.id}>
          <Blog key={blog.id} blog={blog} updateLike={updateLike} user={user}/>
        </div>
      ))}
    </div>
  )
}

export default BlogList