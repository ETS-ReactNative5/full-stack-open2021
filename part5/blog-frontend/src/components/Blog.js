import React, { useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { addAComment, deleteBlogPost, updateBlogLike } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

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
      comments: blog.comments
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

  const generateId = () => {
    return Math.random()
  }

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const handleComment = async (event) => {
    event.preventDefault()
    const newPost = {
      ...blog,
      comments: [...blog.comments, comment]
    }
    dispatch(addAComment(newPost, blog.id))
    setComment('')
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
        <h3>comments</h3>
        <input 
          type='text' 
          name='comment'
          value={comment}
          onChange={handleChange}
          placeholder='comment...'
          />
        <input 
          type="button" 
          onClick={handleComment}
          value='add comment'
          />
        <ul>
          {blog.comments.map(comment => (
            <li key={generateId()}>{comment}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Blog