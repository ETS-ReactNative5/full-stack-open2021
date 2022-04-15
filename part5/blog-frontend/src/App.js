import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import ErrorMessage from './components/ErrorMessage'
import ValidMessage from './components/ValidMessage'
import CreateForm from './components/CreateForm'
import loginService from './services/login'

import blogService from './services/blogs'
import './index.css'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'

// Redux implementation
import { useDispatch, useSelector } from 'react-redux'
import { addBlog, initializeBlogs } from './reducers/blogsReducer'
import { timedError } from './reducers/errorReducer'
import { timedValid } from './reducers/validReducer'
import { setTheUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setTheUser(user))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(user);
      blogService.setToken(user.token)
      dispatch(setTheUser(user))
      setUsername('')
      setPassword('')

    } catch (exception) {
      dispatch(timedError('Wrong Credentials'))
      setUsername('')
      setPassword('')
    }
    // add a dispatch to clear the state
  }

  const clearLocStor = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(setTheUser(null))
  }

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

  const user = useSelector(state => state.user)

  return (
    <div>
      <ErrorMessage/>
      {user === null
        ? <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        : <div>
          <ValidMessage/>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={clearLocStor}>log out</button>
          </div>
          <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
            <h2>create new</h2>
            <CreateForm createBlog={createBlog} user={user}/>
          </Togglable>
          <h2>blogs</h2>
          <BlogList updateLike={updateBlogLikes} user={user} deleteBlogPost={deleteBlogPost}/>
        </div>
      }
    </div>
  )
}

export default App
