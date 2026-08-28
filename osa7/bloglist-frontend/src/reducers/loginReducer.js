import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const STORAGE_KEY = 'loggedBlogappUser'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = loginSlice.actions

export const initializeUser = () => dispatch => {
  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (stored) {
    const user = JSON.parse(stored)
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const login = credentials => async dispatch => {
  try {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  } catch {
    dispatch(setNotification('wrong username or password', 'error'))
  }
}

export const logout = () => dispatch => {
  window.localStorage.removeItem(STORAGE_KEY)
  blogService.setToken(null)
  dispatch(setUser(null))
}

export default loginSlice.reducer
