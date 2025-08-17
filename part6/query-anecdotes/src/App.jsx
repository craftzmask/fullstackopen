import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAnecdotes
  })

  if (result.isLoading) {
    return <p>Loading...</p>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  )
}

export default App
