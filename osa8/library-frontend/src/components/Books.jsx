import { useQuery } from '@apollo/client/react'
import { useState } from 'react'

import { ALL_BOOKS, ALL_GENRES } from '../queries'
import BookTable from './BookTable'

const Books = () => {
  const [genre, setGenre] = useState(null)
  const genres = useQuery(ALL_GENRES)
  // Filtering happens on the server: the genre is a query variable.
  const result = useQuery(ALL_BOOKS, { variables: { genre } })

  if (result.loading || genres.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}

      <BookTable books={result.data.allBooks} />

      <div>
        {genres.data.allGenres.map(option => (
          <button key={option} onClick={() => setGenre(option)}>
            {option}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
