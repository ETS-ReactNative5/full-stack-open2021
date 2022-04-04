import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const createReduxStore = () => {
    const store = configureStore({
        reducer: {
            anecdotes: anecdoteReducer,
            notification: notificationReducer,
            filter: filterReducer
        }
    })
    return store
}

export default createReduxStore