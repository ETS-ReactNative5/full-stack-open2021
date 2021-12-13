import React, { useState } from 'react'

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({initialState, valueGood, valueNeutral, valueBad, valueAll,  valueAverage, valuePositive }) => {
  if (initialState) {
    return (
      <table>
        <StatisticLine text={'good'} value={valueGood} />
        <StatisticLine text={'neutral'} value={valueNeutral}/>
        <StatisticLine text={'bad'} value={valueBad}/>
        <StatisticLine text={'All'} value={valueAll}/>
        <StatisticLine text={'Average'} value={valueAverage}/>
        <StatisticLine text={'Positive'} value={valuePositive} sign={'%'}/>
      </table>
    )
  } else {
    return ''
  }
}

const StatisticLine = ({ text, value, sign}) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
       {value} {sign}
      </td>
    </tr>
  )
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
      <Statistic initialState={initial} valueGood={good} valueNeutral={neutral} valueBad={bad} valueAll={all} valueAverage={(average === 0) ? 0 : average / all} valuePositive={(good === 0 || all === 0) ? 0 : (good / all) * 100} />
    </div>
  )
}

export default App