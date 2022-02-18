import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import ErrorMessage from './components/ErrorMessage'

import loginService from './services/login'
import usersService from './services/users'
import blogService from './services/blogs'
import './index.css'
import BlogList from './components/BlogList'
import jwt_decode from 'jwt-decode'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [validMessage, setValidMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    usersService.getAllUsers().then(users => 
      setUsers( users )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const findUserBlogs = (user) => {
    const token_decoded = jwt_decode(user.token)
    const userLog = users.filter(u => u.id === token_decoded.id)
    return userLog[0].blogs
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  } 
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  } 
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  } 

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
      setBlogs(findUserBlogs(user))
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

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const response = await blogService.createBlogEntry(newBlog)
    setBlogs(blogs.concat(response))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setValidMessage(`A new blog ${newBlog.title} ${newBlog.author} added`)
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
      : 
        <BlogList 
          blogs={blogs}
          userLogged={user}
          clearLocStor={clearLocStor}
          createBlog={createBlog}
          newTitle={newTitle}
          handleTitleChange={handleTitleChange}
          newAuthor={newAuthor}
          handleAuthorChange={handleAuthorChange}
          newUrl={newUrl}
          handleUrlChange={handleUrlChange}
          validMessage={validMessage}
        />      
      }
    </div>
  )
}

export default App
