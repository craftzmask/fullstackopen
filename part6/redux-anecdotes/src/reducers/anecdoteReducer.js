import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlicer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(s => s.id === id)
      const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(s => s.id !== id ? s : votedAnecdote)
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlicer.actions

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.create({
      content, votes: 0
    })
    dispatch(appendAnecdote(data))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch(setAnecdotes(data))
  }
}

export default anecdoteSlicer.reducer