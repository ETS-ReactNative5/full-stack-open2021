import AnecdoteList from './components/AnecdoteList'
import AnectodeForm from './components/AnectodeForm'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnectodeForm />
      <AnecdoteList />
    </div>
  )
}

export default App