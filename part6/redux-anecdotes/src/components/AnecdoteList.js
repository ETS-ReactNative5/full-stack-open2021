import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnAnecdote, sortAnecdotes, createAnecdote } from '../reducers/anecdoteReducer'
import { showMessage, hideMessage } from '../reducers/notificationReducer'

const Anecdote = ({ id, content, votes, handleVote }) => {
    return (
        <div key={id}>
          <div>
            {content}
          </div>
          <div>
            has {votes}
            <button onClick={() => handleVote(id)}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => {
    if (filter === '') {
      return state.anecdotes
    } else {
      const newAnecdotes = state.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      return newAnecdotes
    }
  })
  const dispatch = useDispatch()


  const vote = (id) => {
    dispatch(voteAnAnecdote(id))
    dispatch(sortAnecdotes())
    const anecdote = anecdotes.filter(a => a.id === id)
    dispatch(showMessage(`you voted '${anecdote[0].content}'`))
    setTimeout(() => {
      dispatch(hideMessage())
    }, 5000)
  }
  return (
    <div>
        {anecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id}
                id={anecdote.id}
                content={anecdote.content}
                votes={anecdote.votes}
                handleVote={vote}
            />
        )}
    </div>
  )
}

export default AnecdoteList