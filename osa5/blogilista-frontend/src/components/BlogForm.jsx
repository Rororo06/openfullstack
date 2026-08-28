import { useState } from 'react'
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
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title
        <input
          data-testid="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div>
        author
        <input
          data-testid="author"
          value={author}
          onChange={event => setAuthor(event.target.value)}
        />
      </div>
      <div>
        url
        <input
          data-testid="url"
          value={url}
          onChange={event => setUrl(event.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
