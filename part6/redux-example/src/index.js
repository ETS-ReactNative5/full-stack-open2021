import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // If none of the above matches, code comes here
    return state
  }
}

const store = createStore(counterReducer)

store.dispatch({ type: 'INCREMENT'})

const App = () => {
  return (
    <>
      <div>
        <p>Current state of the store: {store.getState()}</p>
      </div>
      <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={(e) => store.dispatch({ type: 'DECREMENT' })}>Decrement</button>
      <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>Zero</button>
    </>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)