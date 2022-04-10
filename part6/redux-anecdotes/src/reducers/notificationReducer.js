import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', show: false }


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showMessage(state, action) {
            const newState = {
                message: action.payload,
                show: true
            }
            return newState
        },
        hideMessage(state, action) {
            const newState = {
                message: '',
                show: false
            }
            return newState
        },
    }
})

export const { showMessage, hideMessage } = notificationSlice.actions

let timeoutID = null

export const setNotification = (message, time) => {
    return (dispatch) => {
        dispatch(showMessage(message))

        if (timeoutID) {
            clearTimeout(timeoutID)
        }

        timeoutID = setTimeout(() => {
            dispatch(hideMessage())
          }, time * 1000)
    }
}

export default notificationSlice.reducer

