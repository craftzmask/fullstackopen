import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = new useMutation({
    mutationFn: anecdoteService.updateAnecdote,
    onSuccess: (data) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id !== data.id ? a : data))
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList