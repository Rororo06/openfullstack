import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    replaceAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      )
    },
  },
})

export const { setAnecdotes, appendAnecdote, replaceAnecdote } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = content => async dispatch => {
  const anecdote = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(anecdote))
}

export const voteAnecdote = anecdote => async dispatch => {
  const voted = await anecdoteService.update({
    ...anecdote,
    votes: anecdote.votes + 1,
  })
  dispatch(replaceAnecdote(voted))
}

export default anecdoteSlice.reducer
