import { useState } from 'react'

const Display = ({ anecdote, vote }) => (
  <div>
    <div>{anecdote}</div>
    <div>has {vote} votes</div>
  </div>
)

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  let indexMostVote = selected
  for (let i = 0; i < anecdotes.length; i++) {
    if (votes[indexMostVote] < votes[i]) {
      indexMostVote = i
    }
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  const handleNextClick = () => {
    let index = selected
    while (index === selected) {
      index = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(index)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Display
        anecdote={anecdotes[selected]}
        vote={votes[selected]} />
      <div>
        <Button
          text='vote'
          onClick={handleVoteClick} />
        <Button
          text='next anecdote'
          onClick={handleNextClick} />
      </div>

      <h2>Anecdote with most votes</h2>
      <Display
        anecdote={anecdotes[indexMostVote]}
        vote={votes[indexMostVote]} />
    </div>
  )
}

export default App