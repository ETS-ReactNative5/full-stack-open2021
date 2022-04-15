import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addAllUsers(state, action) {
      return action.payload
    }
  }
})

export const { addAllUsers } = usersSlice.actions

export default usersSlice.reducer