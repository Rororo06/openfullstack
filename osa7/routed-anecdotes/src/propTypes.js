import PropTypes from 'prop-types'

export const anecdoteShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
})
