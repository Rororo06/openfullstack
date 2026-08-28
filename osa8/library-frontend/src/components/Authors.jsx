import { useMutation, useQuery } from '@apollo/client/react'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = ({ token, setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: error => setError(error.message),
    onCompleted: data => {
      if (!data.editAuthor) {
        setError('author not found')
      }
    },
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = event => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(author => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && (
        <div>
          <h3>set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              name
              <select
                value={name}
                onChange={event => setName(event.target.value)}
              >
                <option value="">select author</option>
                {authors.map(author => (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              born
              <input
                type="number"
                value={born}
                onChange={event => setBorn(event.target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      )}
    </div>
  )
}

Authors.propTypes = {
  token: PropTypes.string,
  setError: PropTypes.func.isRequired,
}

export default Authors
