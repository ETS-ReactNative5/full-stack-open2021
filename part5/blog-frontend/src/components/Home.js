import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// SERVICES
import blogService from '../services/blogs'
import loginService from '../services/login'

// REDUCERS
import { setTheUser } from '../reducers/userReducer'
import { addBlog, initializeBlogs } from '../reducers/blogsReducer'
import { timedValid } from '../reducers/validReducer'

// COMPONENTS
import BlogList from './BlogList'
import CreateForm from './CreateForm'
import Togglable from './Togglable'
import ValidMessage from './ValidMessage'
import ErrorMessage from './ErrorMessage'
import LoginForm from './LoginForm'
import { timedError } from '../reducers/errorReducer'

const Blogs = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // LOGIN FUNCTIONALITIES
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setTheUser(user))
      setUsername('')
      setPassword('')

    } catch (exception) {
      dispatch(timedError('Wrong Credentials'))
      setUsername('')
      setPassword('')
    }
  }

  const clearLocStor = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(setTheUser(null))
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
      {user === null
        ? 
        <>
          <ErrorMessage/>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </>
        : 
          <div>
              <ValidMessage/>
              <div>
                <p>{user.name} logged in</p>
                <button onClick={clearLocStor}>log out</button>
              </div>
              <h2>blogs</h2>
              <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
                <h2>create new</h2>
                <CreateForm createBlog={createBlog} user={user}/>
              </Togglable>
              
              <BlogList updateLike={updateBlogLikes} user={user} deleteBlogPost={deleteBlogPost}/>
            </div>
      }
    </div>
  )
}

export default Blogs