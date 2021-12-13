import React, { useState } from 'react'

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({ text, statistic, sign, initialState }) => {
  if (initialState) {
    return (
      <p>
        {text}: {statistic} {sign}
      </p>
    )
  } else {
    return ''
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [initial, setInitial] = useState(false)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => {
        setGood(good + 1);
        setAll(all + 1);
        setAverage(average + 1);
        setInitial(true);
        }} 
        text={'Good'} />
      <Button handleClick={() => {
        setNeutral(neutral + 1);
        setAll(all + 1);
        setInitial(true);
        }} 
        text={'Neutral'} />
      <Button handleClick={() => {
        setBad(bad + 1);
        setAll(all + 1)
        setAverage(average - 1)
        setInitial(true);
        }} 
        text={'Bad'} />
      <h1>Statistics</h1>
      {(!initial) ? 'No Feedback Given' : ''}
      <Statistic text={'Good'} statistic={good} initialState={initial}/>
      <Statistic text={'Neutral'} statistic={neutral} initialState={initial}/>
      <Statistic text={'Bad'} statistic={bad} initialState={initial}/>
      <Statistic text={'All'} statistic={all} initialState={initial}/>
      <Statistic text={'Average'} statistic={(average == 0) ? 0 : average / all} initialState={initial}/>
      <Statistic text={'Positive'} statistic={(good == 0 || all == 0) ? 0 : (good / all) * 100} sign={'%'} initialState={initial}/>
    </div>
  )
}

export default App