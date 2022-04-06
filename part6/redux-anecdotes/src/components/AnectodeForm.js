import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer' 
import { showMessage, hideMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnectodeForm = () => {
    const dispatch = useDispatch()
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newNote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newNote))
        dispatch(sortAnecdotes())
        dispatch(showMessage(`you created '${content}'`))
        setTimeout(() => {
            dispatch(hideMessage())
        }, 5000)
    }

    const style = {
        marginBottom: 20,
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote} style={style}>
                <div><input name='anecdote' autoComplete='off' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnectodeForm