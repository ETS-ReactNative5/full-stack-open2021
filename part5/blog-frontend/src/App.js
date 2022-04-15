import { useEffect } from 'react'
import './index.css'

// SERVICES
import userService from './services/users'

// COMPONENTS
import Home from './components/Home'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

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

  const clearLocStor = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(setTheUser(null))
  }
  
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const uMatch = useMatch('/users/:id')
  const userMatch = uMatch
      ? users.find(u => u.id === uMatch.params.id)
      : null

  const bMatch = useMatch('blogs/:id')
  const blogMatch = bMatch
      ? blogs.find(b => b.id === bMatch.params.id)
      : null

  const navbar = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: '0 20px 0 20px', 
  }

  return (
    <div>
    {
      user
      && <>
          <div style={navbar} className='nav'>
            <Link style={{ padding: 5 }} to='/'>blogs</Link>
            <Link style={{ padding: 5 }} to='/users'>users</Link>
            <p>{user.name} logged in</p>
            <button onClick={clearLocStor}>log out</button>
          </div>
        </>
    }
      <Routes>
        <Route path='/' element={
          user === null ? <Navigate to='/login' /> : <Home />
          }/>
        <Route path='/users' element={<Users />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/users/:id' element={<UserBlogs user={userMatch} />} />
        <Route path='/blogs/:id' element={<Blog blog={blogMatch} />} />
      </Routes>

    </div>
  )
}

export default App
