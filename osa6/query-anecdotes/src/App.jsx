import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useNotify } from './NotificationContext'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: anecdote => {
      queryClient.setQueryData(['anecdotes'], anecdotes =>
        anecdotes.map(current =>
          current.id === anecdote.id ? anecdote : current
        )
      )
      notify(`anecdote '${anecdote.content}' voted`)
    },
  })

  if (result.isPending) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data.toSorted((a, b) => b.votes - a.votes)

  const handleVote = anecdote =>
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} onVote={handleVote} />
    </div>
  )
}

export default App
