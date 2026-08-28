import { useMutation } from '@apollo/client/react'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { updateBooksCache } from '../App'
import { ADD_BOOK, ALL_AUTHORS, ALL_GENRES } from '../queries'

const NewBook = ({ setError, setPage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_GENRES }],
    onError: error => setError(error.message),
    update: (cache, response) => updateBooksCache(cache, response.data.addBook),
    onCompleted: () => setPage('books'),
  })

  const submit = async event => {
    event.preventDefault()

    addBook({
      variables: { title, author, published: Number(published), genres },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={event => setTitle(event.target.value)} />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={event => setPublished(event.target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={event => setGenre(event.target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  setError: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default NewBook
