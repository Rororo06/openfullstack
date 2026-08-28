import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control
          data-testid="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>author</Form.Label>
        <Form.Control
          data-testid="author"
          value={author}
          onChange={event => setAuthor(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>url</Form.Label>
        <Form.Control
          data-testid="url"
          value={url}
          onChange={event => setUrl(event.target.value)}
        />
      </Form.Group>
      <Button type="submit" className="mt-2">
        create
      </Button>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
