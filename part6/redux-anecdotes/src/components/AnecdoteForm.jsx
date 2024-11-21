import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = e => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))

    dispatch(createNotification(`Added ${anecdote}`))
    setTimeout(() => {
      dispatch(removeNotification(''))
    }, 2000)
  }

  return (
    <form onSubmit={add}>
      <div><input name='anecdote' /></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm