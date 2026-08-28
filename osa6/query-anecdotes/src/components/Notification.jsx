import { useNotificationValue } from '../NotificationContext'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5,
}

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  return (
    <div style={style} role="alert">
      {notification}
    </div>
  )
}

export default Notification
