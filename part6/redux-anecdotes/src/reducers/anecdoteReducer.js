import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    anecdoteVoted(state, action) {
      const anecdote = action.payload
      const idx = state.findIndex(s => s.id === anecdote.id)
      state[idx] = anecdote
    },
    anecdoteAdded(state, action) {
      return state.concat(action.payload)
    },
    anecdotesInitialized(state, action) {
      return action.payload
    }
  }
})

export const { anecdoteVoted, anecdoteAdded, anecdotesInitialized } = anecdoteSlice.actions

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.create({
      content, votes: 0
    })
    dispatch(anecdoteAdded(data))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch(anecdotesInitialized(data))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const data = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(anecdoteVoted(data))
  }
}

export default anecdoteSlice.reducer