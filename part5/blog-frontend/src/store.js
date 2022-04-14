import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import errorReducer from './reducers/errorReducer'
import validReducer from './reducers/validReducer'

const createReduxStore = () => {
  const store = configureStore({
    reducer: {
      blogs: blogsReducer,
      error: errorReducer,
      valid: validReducer
    }
  })
  return store
}

export default createReduxStore