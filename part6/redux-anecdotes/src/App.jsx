import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const sortedAnecdotes = [...anecdotes]
    .sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: { id }
    })
  }

  const add = e => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch({
      type: 'ADD',
      payload: { content }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='content' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App