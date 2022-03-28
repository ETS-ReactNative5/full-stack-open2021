import AnecdoteList from './components/AnecdoteList'
import AnectodeForm from './components/AnectodeForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnectodeForm />
      <AnecdoteList />
    </div>
  )
}

export default App