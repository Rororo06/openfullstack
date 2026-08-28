import PropTypes from 'prop-types'

const Notify = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div style={{ color: 'red' }} role="alert">
      {message}
    </div>
  )
}

Notify.propTypes = {
  message: PropTypes.string,
}

export default Notify
