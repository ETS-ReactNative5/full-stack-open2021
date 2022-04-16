import React, { useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { addAComment, updateBlogLike } from '../reducers/blogsReducer'
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
    <div className='container mx-auto'>
      <div>
        <button onClick={() => navigate('/')} className='font-mono text-center text-slate-700 p-2 w-20 h-9 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:shadow-md hover:transition-all dark:text-slate-200 dark:bg-slate-900 mt-2'>Back</button>
        <h1 className='text-slate-700 dark:text-slate-200'>{blog.title} {blog.author}</h1>
        <div className='flex items-center justify-between'>
          <div>
            <div className='text-slate-700 dark:text-slate-200 italic mb-3'>Added by: {blog.author}</div>
            <div className='text-slate-700 mb-6 dark:text-slate-200'>{blog.url}</div>
          </div>
          <div>
            <div className='text-slate-700 dark:text-slate-200'>{blog.likes} likes <button onClick={like} data-testid="#like" className='font-mono text-center text-slate-700 p-2 w-20 h-9 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:shadow-md hover:transition-all dark:text-slate-200 dark:bg-slate-900'>Like</button></div>
          </div>
        </div>
          
        <h3 className='text-slate-700 dark:text-slate-200'>Comments</h3>
        <div>
          <input 
            type='text' 
            name='comment'
            value={comment}
            onChange={handleChange}
            placeholder='comment...'
            autoComplete='off'
            className='font-mono w-72 h-6 p-1 pl-3 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:transition-all hover:shadow-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500 dark:bg-slate-900 dark:text-slate-200 mr-6'
            />
          <input 
            type="button" 
            onClick={handleComment}
            value='add comment'
            className='font-mono text-center text-slate-700 p-2 w-32 h-9 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:shadow-md hover:transition-all dark:text-slate-200 dark:bg-slate-900'
            />
        </div>
        <ul className='list-none'>
          {blog.comments.map(comment => (
            <li 
              key={generateId()}
              className='text-slate-700 dark:text-slate-200 mb-5 mt-5'
            >
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog