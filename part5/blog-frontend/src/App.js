import { useEffect } from 'react'
import './index.css'

// SERVICES
import loginService from './services/login'
import blogService from './services/blogs'

// COMPONENTS
import Home from './components/Home'
import Users from './components/Users'

// Redux implementation
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setTheUser } from './reducers/userReducer'

// Router Implementation
import {
  BrowserRouter as Router,
  Routes, Route, Link, Redirect
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

  const padding = {
    padding: 5
  }
  
  const user = useSelector(state => state.user)
  return (
    <div>
    {
      user
      ? <>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/users'>users</Link>
      </>
      : ''
    }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
      </Routes>

    </div>
  )
}

export default App
