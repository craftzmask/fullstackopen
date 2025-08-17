import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const createAnecdote = (object) => {
  return axios.post(baseUrl, object).then(res => res.data)
}

const updateAnecdote = (object) => {
  return axios.put(`${baseUrl}/${object.id}`, object)
    .then(res => res.data)
}

export default { getAnecdotes, createAnecdote, updateAnecdote }