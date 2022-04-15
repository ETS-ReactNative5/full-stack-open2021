import React from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlogPost, updateBlogLike } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  if (!blog) {
    return null
  }
  
  let token_decoded
  if (user) {
    token_decoded = jwt_decode(user.token)
  } else {
    token_decoded = null
  }


  const like = (event) => {
    event.preventDefault()
    const newBlog = {
      user: user ? token_decoded.id : null,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    dispatch(updateBlogLike(newBlog, blog.id))
  }

  const deletePost = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}?`)) {
      const token_decoded = jwt_decode(user.token)
      console.log(token_decoded)
      dispatch(deleteBlogPost(blog.id, token_decoded))
    }
  }

  return (
    <>
      <div>
        <h1>{blog.title} {blog.author}</h1>
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes} likes <button onClick={like} data-testid="#like">like</button></div>
          <div>Added by: {blog.author}</div>
          <button onClick={deletePost}>remove</button>
          <button onClick={() => navigate('/')}>back</button>
        </div>
      </div>
    </>
  )
}


export default Blog