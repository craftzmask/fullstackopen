import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <form onSubmit={add}>
      <div><input name="content" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm