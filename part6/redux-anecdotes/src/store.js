import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const createReduxStore = () => {
    const store = configureStore({
        reducer: {
            anecdotes: anecdoteReducer,
            notification: notificationReducer,
        }
    })
    return store
}

export default createReduxStore