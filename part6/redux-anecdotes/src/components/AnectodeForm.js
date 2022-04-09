import { connect } from 'react-redux'
import { createAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer' 
import { showMessage, hideMessage } from '../reducers/notificationReducer'

const AnectodeForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.sortAnecdotes()
        props.showMessage(`you created '${content}'`)
        setTimeout(() => {
            props.hideMessage()
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


export default connect(
    null,
    { createAnecdote, sortAnecdotes, showMessage, hideMessage }
)(AnectodeForm)
