import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => 
    [...state].sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'VOTE',
      payload: { id }
    })
  }

  const addAnecdote = (e) => {
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
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App