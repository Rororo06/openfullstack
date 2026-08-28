import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useNotify } from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: anecdote => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${anecdote.content}' created`)
    },
    onError: () => {
      notify('too short anecdote, must have length 5 or more')
    },
  })

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      notify('too short anecdote, must have length 5 or more')
      return
    }

    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" data-testid="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
