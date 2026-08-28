import { useApolloClient, useSubscription } from '@apollo/client/react'
import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

// Apollo's cache is normalised by id, so a new book only has to be pushed into
// the (possibly several) allBooks lists it belongs to.
export const updateBooksCache = (cache, book) => {
  const addTo = variables => {
    cache.updateQuery({ query: ALL_BOOKS, variables }, data => {
      if (!data) {
        return data
      }

      if (data.allBooks.some(existing => existing.id === book.id)) {
        return data
      }

      return { allBooks: data.allBooks.concat(book) }
    })
  }

  addTo({ genre: null })
  book.genres.forEach(genre => addTo({ genre }))
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [error, setError] = useState(null)
  const client = useApolloClient()

  const notify = message => {
    setError(message)
    setTimeout(() => setError(null), 5000)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client: subscriptionClient }) => {
      const book = data.data.bookAdded
      notify(`${book.title} added`)
      updateBooksCache(subscriptionClient.cache, book)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Notify message={error} />

      {page === 'authors' && <Authors token={token} setError={notify} />}
      {page === 'books' && <Books />}
      {page === 'add' && <NewBook setError={notify} setPage={setPage} />}
      {page === 'recommend' && <Recommendations />}
      {page === 'login' && (
        <LoginForm setToken={setToken} setError={notify} setPage={setPage} />
      )}
    </div>
  )
}

export default App
