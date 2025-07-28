import { useState } from 'react'

const Anecdote = ({ title, text, votes }) => (
  <div>
    <h2>{title}</h2>
    <div>{text}</div>
    <div>has {votes} votes</div>
  </div>
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
  const mostVotesIndex = votes.indexOf(Math.max(...votes))

  const handleNextClick = () => {
    let index = selected
    while (index === selected) {
      index = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(index)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  return (
    <div>
      <Anecdote
        title='Anecdote of the day'
        text={anecdotes[selected]}
        votes={votes[selected]}
      />
      <div>
        <button onClick={handleVoteClick}>
          vote
        </button>
        <button onClick={handleNextClick}>
          next anecdote
        </button>
      </div>

      <Anecdote
        title='Anecdote with most votes'
        text={anecdotes[mostVotesIndex]}
        votes={votes[mostVotesIndex]}
      />
    </div>
  )
}

export default App