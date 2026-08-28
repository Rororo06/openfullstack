import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { showNotification, clearNotification } = notificationSlice.actions

let timeoutId = null

export const setNotification =
  (message, type = 'success', seconds = 5) =>
  dispatch => {
    dispatch(showNotification({ message, type }))

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => dispatch(clearNotification()), seconds * 1000)
  }

export default notificationSlice.reducer
