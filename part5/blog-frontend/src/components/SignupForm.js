import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// SERVICES
import userService from '../services/users'

// REDUCERS
import { timedError } from '../reducers/errorReducer'
import { timedValid } from '../reducers/validReducer'
import ErrorMessage from './ErrorMessage'
import ValidMessage from './ValidMessage'


const SignUpForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      navigate('/')
    }

  }, [])
    
  
  const handleSignUp = async (event) => {
    event.preventDefault()
    // check if the psw is the same in both fields
    // check if the username is already taken
    // create the new user 
    // redirect to login page
    if (password !== confirmedPassword) {
      dispatch(timedError('Passwords not matching'))
      setConfirmedPassword('')
      setPassword('')
      return null
    }
    const newUser = {
      username: username,
      name: name,
      password: password,
      blogs: []
  }
    try {
      await userService.signupNewUser(newUser)
      dispatch(timedValid('User successfully created'))
      navigate('/login')

    } catch (exception) {
      dispatch(timedError('User not created'))
      setPassword('')
      setConfirmedPassword('')
    }
  }


  return (
    <div className='flex flex-col justify-center items-center h-screen font-mono bg-white dark:bg-slate-900'>
      <div className='h-96'>
        <ErrorMessage/>
        <ValidMessage/>
        <h2 className='text-4xl text-slate-700 dark:text-slate-200'>Sign Up</h2>
        <form onSubmit={handleSignUp} className='flex flex-col'>
          <div className='flex flex-col mb-6'>
            <label className='mb-2 text-slate-700 dark:text-slate-200'>Name</label>
            <input
              id='name'
              type="text"
              value={name}
              name="Name"
              autoComplete='off'
              onChange={({ target }) => setName(target.value)}
              className='font-mono w-72 h-6 p-1 pl-3 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:transition-all hover:shadow-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500 dark:bg-slate-900 dark:text-slate-200'
            />
          </div>
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
          <div className='flex flex-col mb-6 '>
          <label className='mb-2 text-slate-700 dark:text-slate-200'>Confirm Password</label>
            <input
              id='confirm-password'
              type="password"
              value={confirmedPassword}
              name="confirm-password"
              onChange={({ target }) => setConfirmedPassword(target.value)}
              className='font-mono w-72 h-6 p-1 pl-3 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:transition-all hover:shadow-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500 dark:bg-slate-900 dark:text-slate-200'
            />
          </div>
          <div className='flex justify-between'>
            <button type="button" onClick={() => navigate('/login')} className='font-mono p-2 w-32 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:shadow-md hover:transition-all dark:text-white dark:bg-slate-900'>Login</button>
            <button type="submit" className='font-mono p-2 w-32 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:shadow-md hover:transition-all dark:text-white dark:bg-slate-900'>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// LoginForm.propTypes = {
//   handleSignUp: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   setUsername: PropTypes.func.isRequired,
//   password: PropTypes.string.isRequired,
//   setPassword: PropTypes.func.isRequired,
// }

export default SignUpForm
