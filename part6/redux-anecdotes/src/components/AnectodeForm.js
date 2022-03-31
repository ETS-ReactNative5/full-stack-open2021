import { useDispatch } from 'react-redux'
import { createAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer' 

const AnectodeForm = () => {
    const dispatch = useDispatch()
    
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(sortAnecdotes())
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' autoComplete='off' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnectodeForm