import AnecdoteList from './components/AnecdoteList'
import AnectodeForm from './components/AnectodeForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnectodeForm />
      <AnecdoteList />
    </div>
  )
}

export default App