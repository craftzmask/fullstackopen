import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
  
    dispatch(addAnecdote(content))
    dispatch(setNotification(`Added anecdote: ${content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <form onSubmit={add}>
      <div><input name="content" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm