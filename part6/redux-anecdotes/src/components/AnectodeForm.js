import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer' 
import { showMessage, hideMessage } from '../reducers/notificationReducer'

const AnectodeForm = () => {
    const dispatch = useDispatch()
    
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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