import { createSlice } from '@reduxjs/toolkit'

const initialState = []

// generate ids
export const generateId = () => 
  Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
          ...noteToChange,
          important: !noteToChange.important
      }
      return state.map(note => note.id !== id ? note : changedNote)
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer

// const noteReducer = (state = initialState, action) => {
//     switch(action.type){
//         case 'NEW_NOTE':
//             return [...state, action.data]
          
//         case 'TOGGLE_IMPORTANCE': {
//             const id = action.data.id
//             const noteToChange = state.find(n => n.id === id)
//             const changedNote = {
//                 ...noteToChange,
//                 important: !noteToChange.important
//             }
//             return state.map(note => note.id !== id ? note : changedNote)
//         }
//         default:
//             return state
//     }
// }



// // action creator for noteReducer
// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     data: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }

// // action creator for NoteReducer
// export const toggleImportanceOf = (id) => {
//   return {
//     type:'TOGGLE_IMPORTANCE',
//     data: { id }
//   }
// }

// export default noteReducer