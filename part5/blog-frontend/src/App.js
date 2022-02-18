import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import loginService from './services/login'
import usersService from './services/users'
import './index.css'
import BlogList from './components/BlogList'
import jwt_decode from 'jwt-decode'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null) 
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)

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
      // blogService.setToken(user.token) <-- insert after implement functionality to create a blog post
    }
  }, [])

  const findUserBlogs = (user) => {
    const token_decoded = jwt_decode(user.token)
    const userLog = users.filter(u => u.id === token_decoded.id)
    return userLog[0].blogs
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
      setUser(user)
      setUsername('')
      setPassword('')
      setBlogs(findUserBlogs(user))
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
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

  return (
    <div>
      <Notification message={errorMessage}/>
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
        />      
      }
    </div>
  )
}

export default App
