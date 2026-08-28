import PropTypes from 'prop-types'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 10,
}

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return (
    <div style={style} role="alert">
      {notification}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string,
}

export default Notification
