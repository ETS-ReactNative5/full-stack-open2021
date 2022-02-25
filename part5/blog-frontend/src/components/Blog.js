import { React, useState } from 'react'
import jwt_decode from 'jwt-decode'

const Blog = ({ blog, updateLike, user, deleteBlogPost }) => {
  let token_decoded
  if (user) {
    token_decoded = jwt_decode(user.token)
  } else {
    token_decoded = null
  }
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
    updateLike({
      user: user ? token_decoded.id : null,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }, blog.id)
  }

  const deletePost = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}?`)) {
      const token_decoded = jwt_decode(user.token)
      console.log(token_decoded)
      deleteBlogPost(blog.id, token_decoded)
    }
  }

  return (
    <>
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggleView}>{view ? 'hide' : 'view'}</button>
        <div style={hideShow}>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={updateBlogLike} data-testid="#like">like</button></div>
          <div>{blog.author}</div>
          <button onClick={deletePost}>remove</button>
        </div>
      </div>
    </>
  )
}


export default Blog