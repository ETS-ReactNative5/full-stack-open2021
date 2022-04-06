import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteChosen = state.find(n => n.id === id)
      const newAnecdote = {
        ...anecdoteChosen,
        votes: anecdoteChosen.votes += 1,
      }
      state = state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote)
    },
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0,
      })
    },
    sortAnecdotes(state, action) {
      const sortedState = state.sort((a, b) => {
        if (a.votes < b.votes) {
          return 1
        } else if (a.votes > b.votes) {
          return -1
        } else {
          return 0
        }
      })

    return sortedState
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, createAnecdote, sortAnecdotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type) {
//     case 'VOTE':
//       const id = action.id.id
//       const anecdoteChosen = state.find(n => n.id === id)
//       const newAnecdote = {
//         ...anecdoteChosen,
//         votes: anecdoteChosen.votes += 1,
//       }
//       const newState = state.map(anecdote => 
//         anecdote.id !== id ? anecdote : newAnecdote)
//       console.log(newState)
//       return newState

//     case 'NEW_ANECDOTE':
//       return [...state, action.data]

//     case 'ORDER_VOTE':
//       // create a descending order -> from the largest to the smallest
//       const sortedState = state.sort((a, b) => {
//         if (a.votes < b.votes) {
//           return 1
//         } else if (a.votes > b.votes) {
//           return -1
//         } else {
//           return 0
//         }
//       })

//     return sortedState
//   }
//   return state
// }

// export const voteAn = (id) => {
//   return {
//     type: 'VOTE',
//     id: { id }
//   }
// }

// export const addAn = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: {
//       content: content,
//       id: getId(),
//       votes: 0,
//     }
//   }
// }

// export const orderAn = () => {
//   return {
//     type: 'ORDER_VOTE'
//   }
// }

