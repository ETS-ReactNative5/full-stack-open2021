import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// SERVICES
import blogService from '../services/blogs'

// REDUCERS
import { addBlog, initializeBlogs } from '../reducers/blogsReducer'
import { timedValid } from '../reducers/validReducer'

// COMPONENTS
import BlogList from './BlogList'
import CreateForm from './CreateForm'
import Togglable from './Togglable'
import ValidMessage from './ValidMessage'

const Blogs = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (!user) {
    return null
  }

  // BLOG FUNCTIONALITIES

  const createBlog = async (blogObject) => {
    const response = await blogService.createBlogEntry(blogObject)
    dispatch(addBlog(response))
    dispatch(timedValid(`A new blog ${blogObject.title} ${blogObject.author} added`))
    dispatch(initializeBlogs())
    blogFormRef.current.toggleVisibility()
  }

  const updateBlogLikes = async (blogPost, id) => {
    await blogService.updateLike(blogPost, id)
    dispatch(initializeBlogs())
  }

  const deleteBlogPost = async (id, user) => {
    await blogService.deleteBlog({
      id: id,
      user: user
    })
    dispatch(initializeBlogs())
    dispatch(timedValid('The blog entry has been deleted'))
  }

  return (
      <div>
          <ValidMessage/>
          <h2>blogs</h2>
          <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
            <h2>create new</h2>
            <CreateForm createBlog={createBlog} user={user}/>
          </Togglable>
          
          <BlogList updateLike={updateBlogLikes} user={user} deleteBlogPost={deleteBlogPost}/>
      </div>
  )
}

export default Blogs