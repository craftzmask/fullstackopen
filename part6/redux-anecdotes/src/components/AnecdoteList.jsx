import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    [...state.anecdotes]
      .filter(a => {
        const anecdote = a.content.toLowerCase()
        return anecdote.includes(state.filter.toLowerCase())
      })
      .sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`Voted anecdote: ${anecdote.content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
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