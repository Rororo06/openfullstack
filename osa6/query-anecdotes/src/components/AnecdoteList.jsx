import PropTypes from 'prop-types'

const AnecdoteList = ({ anecdotes, onVote }) => (
  <div>
    {anecdotes.map(anecdote => (
      <div key={anecdote.id} className="anecdote">
        <div>{anecdote.content}</div>
        <div>
          has <span className="votes">{anecdote.votes}</span>
          <button onClick={() => onVote(anecdote)}>vote</button>
        </div>
      </div>
    ))}
  </div>
)

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
  onVote: PropTypes.func.isRequired,
}

export default AnecdoteList
