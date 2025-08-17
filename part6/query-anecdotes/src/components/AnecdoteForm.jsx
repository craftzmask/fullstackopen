import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'
import { useNotifcationDispatch } from '../reducers/NotificationReducer'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotifcationDispatch()

  const newAnecdoteMutation = new useMutation({
    mutationFn: anecdoteService.createAnecdote,
    onSuccess: (data) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(data))
      notificationDispatch({ type: 'SET', payload: `added ${data.content}` })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
