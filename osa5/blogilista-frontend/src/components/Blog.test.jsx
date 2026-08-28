import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Blog from './Blog.jsx'

const blog = {
  id: '1',
  title: 'Component testing is done with react-testing-library',
  author: 'Matti Luukkainen',
  url: 'http://example.com/testing',
  likes: 5,
  user: { username: 'mluukkai', name: 'Matti Luukkainen' },
}

const renderBlog = (props = {}) =>
  render(
    <Blog
      blog={blog}
      onLike={vi.fn()}
      onRemove={vi.fn()}
      canRemove
      {...props}
    />
  )

describe('<Blog />', () => {
  test('renders title and author but not url or likes by default', () => {
    const { container } = renderBlog()

    expect(screen.getByText(blog.title, { exact: false })).toBeDefined()
    expect(screen.getByText(blog.author, { exact: false })).toBeDefined()
    expect(container.querySelector('.blog-details')).toBeNull()
  })

  test('shows url and likes when the view button is clicked', async () => {
    const { container } = renderBlog()
    const user = userEvent.setup()

    await user.click(screen.getByText('view'))

    const details = container.querySelector('.blog-details')
    expect(details).not.toBeNull()
    expect(details).toHaveTextContent(blog.url)
    expect(details).toHaveTextContent('likes 5')
  })

  test('calls the like handler twice when like is clicked twice', async () => {
    const onLike = vi.fn()
    renderBlog({ onLike })
    const user = userEvent.setup()

    await user.click(screen.getByText('view'))
    await user.click(screen.getByText('like'))
    await user.click(screen.getByText('like'))

    expect(onLike.mock.calls).toHaveLength(2)
  })
})
