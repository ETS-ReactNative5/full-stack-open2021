import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/anecdoteReducer'

const createReduxStore = () => {
    const store = configureStore({
        reducer: {
            anecdotes: reducer,
        }
    })
    return store
}

export default createReduxStore