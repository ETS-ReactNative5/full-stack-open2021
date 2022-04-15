import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import errorReducer from './reducers/errorReducer'
import validReducer from './reducers/validReducer'
import userReducer from './reducers/userReducer'

const createReduxStore = () => {
  const store = configureStore({
    reducer: {
      blogs: blogsReducer,
      error: errorReducer,
      valid: validReducer,
      user: userReducer,
    }
  })
  return store
}

export default createReduxStore