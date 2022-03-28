const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newStateGood = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad,
      }
      return newStateGood
    case 'OK':
      const newStateOk = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad,
      }
      return newStateOk
    case 'BAD':
      const newStateBad = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1,
      }
      return newStateBad
    case 'ZERO':
      const newStateZero = {
        good: 0,
        ok: 0,
        bad: 0,
      }
      return newStateZero
    default: return state
  }
  
}

export default counterReducer