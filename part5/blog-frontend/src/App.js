import { useEffect } from 'react'
import './index.css'

// SERVICES
import userService from './services/users'

// COMPONENTS
import Home from './components/Home'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import LoginForm from './components/LoginForm'

// Redux implementation
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setTheUser } from './reducers/userReducer'
import { addAllUsers } from './reducers/usersReducer'

// Router Implementation
import {
  Routes, Route, Link, useMatch, Navigate
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()

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

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await userService.getAllUsers()
      dispatch(addAllUsers(allUsers))
    }
    getUsers()
  }, [])

  const padding = {
    padding: 5
  }
  
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const match = useMatch('/users/:id')
  const userMatch = match
      ? users.find(u => u.id === match.params.id)
      : null

  const clearLocStor = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(setTheUser(null))
  }

  return (
    <div>
    {
      user
      && <>
          <Link style={padding} to='/'>home</Link>
          <Link style={padding} to='/users'>users</Link>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={clearLocStor}>log out</button>
          </div>
        </>
    }
      <Routes>
        <Route path='/' element={
          !user ? <Navigate to='/login' /> : <Home />
          }/>
        <Route path='/users' element={<Users />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/users/:id' element={<UserBlogs user={userMatch} />} />
      </Routes>

    </div>
  )
}

export default App
