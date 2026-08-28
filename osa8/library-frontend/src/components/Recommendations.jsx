import { useQuery } from '@apollo/client/react'

import { ALL_BOOKS, ME } from '../queries'
import BookTable from './BookTable'

const Recommendations = () => {
  const me = useQuery(ME)
  const genre = me.data?.me?.favoriteGenre
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  })

  if (me.loading || result.loading || !result.data) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{genre}</strong>
      </p>
      <BookTable books={result.data.allBooks} />
    </div>
  )
}

export default Recommendations
