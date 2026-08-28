import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'

import anecdoteReducer, {
  appendAnecdote,
  replaceAnecdote,
  setAnecdotes,
} from './anecdoteReducer'

describe('anecdoteReducer', () => {
  const anecdotes = [
    { id: '1', content: 'first', votes: 0 },
    { id: '2', content: 'second', votes: 3 },
  ]

  test('anecdotes can be set', () => {
    const state = anecdoteReducer([], setAnecdotes(anecdotes))
    expect(state).toEqual(anecdotes)
  })

  test('an anecdote can be appended without mutating the state', () => {
    deepFreeze(anecdotes)
    const created = { id: '3', content: 'third', votes: 0 }

    const state = anecdoteReducer(anecdotes, appendAnecdote(created))
    expect(state).toHaveLength(3)
    expect(state).toContainEqual(created)
  })

  test('a voted anecdote replaces the old one', () => {
    deepFreeze(anecdotes)
    const voted = { id: '2', content: 'second', votes: 4 }

    const state = anecdoteReducer(anecdotes, replaceAnecdote(voted))
    expect(state.find(anecdote => anecdote.id === '2').votes).toBe(4)
    expect(state.find(anecdote => anecdote.id === '1').votes).toBe(0)
  })
})
