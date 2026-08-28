import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    replaceBlog(state, action) {
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, replaceBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => async dispatch => {
  dispatch(setBlogs(await blogService.getAll()))
}

export const createBlog = newBlog => async dispatch => {
  const blog = await blogService.create(newBlog)
  dispatch(appendBlog(blog))
  dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`))
}

export const likeBlog = blog => async dispatch => {
  const updated = await blogService.update(blog.id, {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user?.id ?? blog.user,
  })
  dispatch(replaceBlog({ ...updated, user: blog.user }))
}

export const deleteBlog = blog => async dispatch => {
  await blogService.remove(blog.id)
  dispatch(removeBlog(blog.id))
  dispatch(setNotification(`blog ${blog.title} removed`))
}

export const commentBlog = (blog, comment) => async dispatch => {
  const updated = await blogService.comment(blog.id, comment)
  dispatch(replaceBlog({ ...updated, user: blog.user }))
}

export default blogSlice.reducer
