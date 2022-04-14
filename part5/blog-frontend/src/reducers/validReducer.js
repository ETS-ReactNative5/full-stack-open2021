import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const validSlice = createSlice({
  name: 'valid',
  initialState,
  reducers: {
    setValid(state, action) {
      const newMessage = action.payload
      return newMessage
    },
    clearValid(state, action) {
      return null
    },
  }
})

export const { setValid, clearValid } = validSlice.actions

export const timedValid = (message) => {
  return async dispatch => {
    dispatch(setValid(message))
    setTimeout(() => {
      dispatch(clearValid())
    }, 5000)
  }
}

export default validSlice.reducer