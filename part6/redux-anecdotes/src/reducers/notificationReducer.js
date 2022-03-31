import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Initial notification state'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducer: {
        printMessage(state, action) {
            console.log('hello');
        }
    }
})

export default notificationSlice.reducer