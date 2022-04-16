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
import ValidMessage from './ValidMessage'


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
    <div className='flex flex-col justify-center items-center h-screen font-mono bg-white dark:bg-slate-900'>
      <div className='h-96'>
        <ErrorMessage/>
        <ValidMessage/>
        <h2 className='text-4xl text-slate-700 dark:text-slate-200'>Login</h2>
        <form onSubmit={handleLogin} className='flex flex-col'>
          <div className='flex flex-col mb-6'>
            <label className='mb-2 text-slate-700 dark:text-slate-200'>Username</label>
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              autoComplete='off'
              onChange={({ target }) => setUsername(target.value)}
              className='font-mono w-72 h-6 p-1 pl-3 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:transition-all hover:shadow-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500 dark:bg-slate-900 dark:text-slate-200'
            />
          </div>
          <div className='flex flex-col mb-6 '>
          <label className='mb-2 text-slate-700 dark:text-slate-200'>Password</label>
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              className='font-mono w-72 h-6 p-1 pl-3 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:transition-all hover:shadow-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500 dark:bg-slate-900 dark:text-slate-200'
            />
          </div>
          <div className='flex justify-between'>
            <button type="submit" className='font-mono p-2 w-32 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:shadow-md hover:transition-all dark:text-white dark:bg-slate-900'>Login</button>
            <button type="button" onClick={() => navigate('/signup')} className='font-mono p-2 w-32 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:shadow-md hover:transition-all dark:text-white dark:bg-slate-900'>Sign up</button>
          </div>
        </form>
      </div>
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
