import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createAnecdote = async anecdote => {
  const res = await axios.post(baseUrl, {
    content: anecdote,
    votes: 0
  })
  return res.data
}

export default {
  getAll, createAnecdote
}