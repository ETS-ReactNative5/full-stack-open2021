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


  return (
    <div className='dark:bg-slate-900 w-screen h-screen'>
    {
      user
      && <div className='container mx-auto'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-between space-x-6'>
              <Link to='/' className='no-underline visited:text-slate-700 dark:visited:text-slate-200 hover:underline hover:decoration-slate-900 dark:hover:decoration-slate-200 '>
                Blogs
              </Link>
              <Link to='/users' className='no-underline visited:text-slate-700 dark:visited:text-slate-200 hover:underline hover:decoration-slate-900 dark:hover:decoration-slate-200'>
                Users
              </Link>
            </div>
            <div className='flex space-x-6 items-center'>
              <p className='text-slate-700 dark:text-slate-200'>'{user.name}' logged in</p>
              <button onClick={clearLocStor} className='font-mono text-slate-700 p-2 w-28 h-10 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:shadow-md hover:transition-all dark:text-slate-200 dark:bg-slate-900'>Logout</button>
            </div>
          </div>
        </div>
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
