import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import loginService from './services/login'
import usersService from './services/users'
import './index.css'
import BlogList from './components/BlogList'

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

  const findUserBlogs = (user) => {
    const userLog = users.filter(u => u.username === user.username)
    return userLog[0].blogs
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
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
          users={users}
        />      
      }
    </div>
  )
}

export default App
