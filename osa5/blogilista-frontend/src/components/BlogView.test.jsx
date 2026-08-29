import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
import BlogView from './BlogView.jsx'

const blog = {
  id: '1',
  title: 'Component testing is done with react-testing-library',
  author: 'Matti Luukkainen',
  url: 'http://example.com/testing',
  likes: 5,
  user: { username: 'mluukkai', name: 'Matti Luukkainen' },
}

const creator = { username: 'mluukkai', name: 'Matti Luukkainen' }
const otherUser = { username: 'hellas', name: 'Arto Hellas' }

const renderBlogView = (user, handlers = {}) =>
  render(
    <MemoryRouter initialEntries={[`/blogs/${blog.id}`]}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blogs={[blog]}
              user={user}
              onLike={handlers.onLike ?? vi.fn()}
              onRemove={handlers.onRemove ?? vi.fn()}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )

describe('<BlogView />', () => {
  test('shows the blog and its likes to an anonymous visitor without buttons', () => {
    renderBlogView(null)

    expect(screen.getByText(blog.title, { exact: false })).toBeDefined()
    expect(screen.getByText(blog.url)).toBeDefined()
    expect(screen.getByText('5')).toBeDefined()
    expect(screen.queryByText('like')).toBeNull()
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('shows only the like button to a logged in user who did not add the blog', () => {
    renderBlogView(otherUser)

    expect(screen.getByText('like')).toBeDefined()
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('shows the remove button to the user who added the blog', () => {
    renderBlogView(creator)

    expect(screen.getByText('like')).toBeDefined()
    expect(screen.getByText('remove')).toBeDefined()
  })

  test('calls the like handler twice when like is clicked twice', async () => {
    const onLike = vi.fn()
    renderBlogView(creator, { onLike })
    const user = userEvent.setup()

    await user.click(screen.getByText('like'))
    await user.click(screen.getByText('like'))

    expect(onLike.mock.calls).toHaveLength(2)
  })
})
