import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'

const createReduxStore = () => {
  const store = configureStore({
    reducer: {
      blogs: blogsReducer
    }
  })
  return store
}

export default createReduxStore