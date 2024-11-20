import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(a => {
      const content = a.content.toLowerCase()
      const filter = state.filter.toLowerCase()
      return content.includes(filter)
    })
  )
  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes]
    .sort((a, b) => b.votes - a.votes)

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(createNotification(`Voted ${anecdote.content}`))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList