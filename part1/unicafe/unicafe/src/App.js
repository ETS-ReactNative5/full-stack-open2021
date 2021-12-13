import React, { useState } from 'react'

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({ text, statistic, sign }) => {
  return (
    <p>
      {text}: {statistic} {sign}
    </p>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => {
        setGood(good + 1);
        setAll(all + 1);
        setAverage(average + 1)
        }} 
        text={'Good'} />
      <Button handleClick={() => {
        setNeutral(neutral + 1);
        setAll(all + 1);
        }} 
        text={'Neutral'} />
      <Button handleClick={() => {
        setBad(bad + 1);
        setAll(all + 1)
        setAverage(average - 1)
        }} 
        text={'Bad'} />
      <h1>Statistics</h1>
      <Statistic text={'Good'} statistic={good} />
      <Statistic text={'Neutral'} statistic={neutral} />
      <Statistic text={'Bad'} statistic={bad} />
      <Statistic text={'All'} statistic={all} />
      <Statistic text={'Average'} statistic={(average == 0) ? 0 : average / all} />
      <Statistic text={'Positive'} statistic={(good == 0 || all == 0) ? 0 : (good / all) * 100} sign={'%'}/>
    </div>
  )
}

export default App