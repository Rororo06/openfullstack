import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return (
    <div className={notification.type} role="alert">
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
  }),
}

export default Notification
