import { useState } from 'react'

const StatisticLine = ({ text, value }) => (
  <div>{text} {value}</div>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  if (!all) return <p>No feedback given</p>

  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive + ' %'} />
    </>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button
        onClick={() => setGood(good + 1)}
        text="good"
      />
      <Button
        onClick={() => setNeutral(neutral + 1)}
        text="neutral"
      />
      <Button
        onClick={() => setBad(bad + 1)}
        text="bad"
      />

      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App