import PropTypes from 'prop-types'

const BookTable = ({ books }) => (
  <table>
    <tbody>
      <tr>
        <th></th>
        <th>author</th>
        <th>published</th>
      </tr>
      {books.map(book => (
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

BookTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      published: PropTypes.number,
      author: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
    })
  ).isRequired,
}

export default BookTable
