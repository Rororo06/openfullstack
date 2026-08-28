import PropTypes from 'prop-types'
import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext(null)

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node,
}

export const useNotificationValue = () => useContext(NotificationContext)[0]

export const useNotify = () => {
  const dispatch = useContext(NotificationContext)[1]

  return (message, seconds = 5) => {
    dispatch({ type: 'SET', payload: message })
    setTimeout(() => dispatch({ type: 'CLEAR' }), seconds * 1000)
  }
}

export default NotificationContext
