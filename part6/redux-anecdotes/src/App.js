import AnecdoteList from './components/AnecdoteList'
import AnectodeForm from './components/AnectodeForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
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