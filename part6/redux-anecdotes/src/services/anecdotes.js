import axios from 'axios'
import { getId } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const anecdotes = await axios.get(baseUrl)
    return anecdotes.data
}

const createNew = async (content) => {
    const obj = {
        content: content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, obj)
    return response.data
}

const addVote = async (id) => {
    const anecdotes = await getAll()
    const anecdote = anecdotes.find(a => a.id === id)
    const newAnecdote = {
        ...anecdote,
        votes: anecdote.votes += 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
    return response.data
}

export default { getAll, createNew, addVote }