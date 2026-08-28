import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm.jsx'

test('<BlogForm /> calls createBlog with the details of the new blog', async () => {
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)
  const user = userEvent.setup()

  await user.type(screen.getByTestId('title'), 'Testing forms')
  await user.type(screen.getByTestId('author'), 'Matti Luukkainen')
  await user.type(screen.getByTestId('url'), 'http://example.com/forms')
  await user.click(screen.getByText('create'))

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing forms',
    author: 'Matti Luukkainen',
    url: 'http://example.com/forms',
  })
})
