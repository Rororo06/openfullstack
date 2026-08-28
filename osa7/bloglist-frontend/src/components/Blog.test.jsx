import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import blogReducer from '../reducers/blogReducer'
import loginReducer from '../reducers/loginReducer'
import notificationReducer from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Blog from './Blog'

const blog = {
  id: '1',
  title: 'Component testing is done with react-testing-library',
  author: 'Test Author',
  url: 'http://example.com/testing',
  likes: 3,
  comments: ['first comment'],
  user: { id: '2', username: 'mluukkai', name: 'Matti Luukkainen' },
}

const renderBlog = () => {
  const store = configureStore({
    reducer: {
      blogs: blogReducer,
      login: loginReducer,
      notification: notificationReducer,
    },
    preloadedState: {
      blogs: [blog],
      login: { username: 'mluukkai', name: 'Matti Luukkainen', token: 'x' },
    },
  })

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/blogs/${blog.id}`]}>
        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )

  return store
}

describe('<Blog />', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  test('renders the blog details and its comments', () => {
    renderBlog()

    expect(screen.getByText(blog.title)).toBeVisible()
    expect(screen.getByText(blog.url)).toBeVisible()
    expect(screen.getByText('3')).toBeVisible()
    expect(screen.getByText('first comment')).toBeVisible()
  })

  test('liking the blog stores the incremented like count', async () => {
    vi.spyOn(blogService, 'update').mockResolvedValue({ ...blog, likes: 4 })
    const store = renderBlog()

    await userEvent.setup().click(screen.getByRole('button', { name: 'like' }))

    expect(blogService.update).toHaveBeenCalledWith(
      blog.id,
      expect.objectContaining({ likes: 4, user: blog.user.id })
    )
    expect(store.getState().blogs[0].likes).toBe(4)
  })

  test('a comment is sent to the backend and shown', async () => {
    vi.spyOn(blogService, 'comment').mockResolvedValue({
      ...blog,
      comments: [...blog.comments, 'nice one'],
    })
    renderBlog()

    const user = userEvent.setup()
    await user.type(screen.getByTestId('comment'), 'nice one')
    await user.click(screen.getByRole('button', { name: 'add comment' }))

    expect(blogService.comment).toHaveBeenCalledWith(blog.id, 'nice one')
    expect(await screen.findByText('nice one')).toBeVisible()
  })
})
