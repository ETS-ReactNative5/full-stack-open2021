import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)
const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteChosen = state.find(n => n.id === id)
      const newAnecdote = {
        ...anecdoteChosen,
        votes: anecdoteChosen.votes += 1,
      }
      state = state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote)
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
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { voteAnecdote, sortAnecdotes, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
    dispatch(sortAnecdotes())
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnAnecdote = (id) => {
  return async dispatch => {
    const changeVote = await anecdoteService.addVote(id)
    dispatch(voteAnecdote(changeVote))
    dispatch(sortAnecdotes())
  }
}

export default anecdoteSlice.reducer