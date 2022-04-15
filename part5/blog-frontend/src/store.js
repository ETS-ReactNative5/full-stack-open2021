import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import errorReducer from './reducers/errorReducer'
import validReducer from './reducers/validReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const createReduxStore = () => {
  const store = configureStore({
    reducer: {
      blogs: blogsReducer,
      error: errorReducer,
      valid: validReducer,
      user: userReducer,
      users: usersReducer
    }
  })
  return store
}

export default createReduxStore