import { createSlice} from "@reduxjs/toolkit"

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheUser(state, action) {
      return action.payload
    },

  }
})

export const { setTheUser } = userSlice.actions

export default userSlice.reducer