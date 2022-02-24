import { React, useState } from 'react'
import jwt_decode from 'jwt-decode'

const Blog = ({ blog, updateLike, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] = useState(false)
  const hideShow = {
    display: view ? '' : 'none'
  }

  const toggleView = () => {
    setView(!view)
  }

  const updateBlogLike = (event) => {
    event.preventDefault()
    const token_decoded = jwt_decode(user.token)
    updateLike({
      user: token_decoded.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }, blog.id)
  }

  return (
    <>
      <div style={blogStyle}>
        {blog.title}
        <button onClick={toggleView}>{view ? 'hide' : 'view'}</button>
        <div style={hideShow}>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={updateBlogLike}>like</button></div>
          <div>{blog.author}</div>
        </div>
      </div>  
    </>
  )
} 


export default Blog