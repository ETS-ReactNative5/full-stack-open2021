import React from 'react'
import Blog from './Blog'
import jwt_decode from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlogPost } from '../reducers/blogsReducer'

// IMPORT ICONS
import { TrashIcon } from '@heroicons/react/solid'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

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

  const deletePost = (blog, event) => {
    console.log(blog);
    event.preventDefault()
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}?`)) {
      const token_decoded = jwt_decode(user.token)
      console.log(token_decoded)
      dispatch(deleteBlogPost(blog.id, token_decoded))
    }
  }

  return (
    <div className='container mx-auto'>
      {userBlogs.map(blog => (
        blog !== null
          ? 
            <div 
              key={blog.id} 
              className='flex items-center pl-6 blog rounded-md border-solid border-blue-400/30 mb-6 h-16'
            >
              <div className='flex items-center justify-between w-full'>
                <Link 
                  to={`/blogs/${blog.id}`}
                  className='no-underline visited:text-slate-900 dark:visited:text-slate-200 hover:underline hover:decoration-slate-900 dark:hover:decoration-slate-200'
                >
                  {blog.title}
                </Link>
                <TrashIcon className='h-5 w-5 text-blue-500 mr-4 hover:text-blue-300' onClick={(e) => deletePost(blog, e)}/>
              </div>
            </div>
          : ''
      ))}
    </div>
  )
}

export default BlogList