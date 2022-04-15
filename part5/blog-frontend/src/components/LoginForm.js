import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// SERVICES
import loginService from '../services/login'
import blogService from '../services/blogs'

// REDUCERS
import { setTheUser } from '../reducers/userReducer'
import { timedError } from '../reducers/errorReducer'
import ErrorMessage from './ErrorMessage'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      navigate('/')
    }

  }, [])
    
  
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
    navigate('/')
  }


  return (
    <div>
      <ErrorMessage/>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id='password'
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   setUsername: PropTypes.func.isRequired,
//   password: PropTypes.string.isRequired,
//   setPassword: PropTypes.func.isRequired,
// }

export default LoginForm
