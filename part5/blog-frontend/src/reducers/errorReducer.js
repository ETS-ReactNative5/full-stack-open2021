import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action) {
      const newMessage = action.payload
      return newMessage
    },
    clearError(state, action) {
      return null
    },
  }
})

export const { setError, clearError } = errorSlice.actions

export const timedError = (message) => {
  return async dispatch => {
    dispatch(setError(message))
    setTimeout(() => {
      dispatch(clearError())
    }, 5000)
  }
}


export default errorSlice.reducer