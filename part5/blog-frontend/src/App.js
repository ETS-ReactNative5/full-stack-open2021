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
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)
  const [validMessage, setValidMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const clearLocStor = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    const response = await blogService.createBlogEntry(blogObject)
    setBlogs(blogs.concat(response))
    setValidMessage(`A new blog ${blogObject.title} ${blogObject.author} added`)
    blogFormRef.current.toggleVisibility()
    setTimeout(() => {
      setValidMessage(null)
    }, 5000)
  }

  const updateBlogLikes = async (blogPost, id) => {
    await blogService.updateLike(blogPost, id)
  }

  const deleteBlogPost = async (id, user) => {
    await blogService.deleteBlog({
      id: id,
      user: user
    })
    setValidMessage('The blog entry has been deleted')
    setTimeout(() => {
      setValidMessage(null)
    }, 5000)
  }

  return (
    <div>
      <ErrorMessage message={errorMessage}/>
      {user === null
        ? <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        : <div>
          <ValidMessage message={validMessage}/>
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
