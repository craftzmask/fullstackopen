import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
  
    dispatch(addAnecdote(content))
    dispatch(notify(`Added anecdote: ${content}`, 5))
  }

  return (
    <form onSubmit={add}>
      <div><input name="content" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm