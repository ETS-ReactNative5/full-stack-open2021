import { createSlice } from '@reduxjs/toolkit'

const initialState = 'ALL'

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        applyFilter(state, action) {
            console.log(state)
            return state
        }
    }
})

export const applyFilter = filterSlice.actions
export default filterSlice.reducer