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

export default { getAll, createNew }