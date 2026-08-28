import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [comment, setComment] = useState('')

  const user = useSelector(state => state.login)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

  if (!blog) {
    return null
  }

  const canRemove = blog.user?.username === user?.username

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const handleComment = event => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
    setComment('')
  }

  return (
    <div className="blog">
      <h2>
        <span className="blog-title">{blog.title}</span>{' '}
        <span className="blog-author">{blog.author}</span>
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span className="blog-likes">{blog.likes}</span> likes{' '}
        <Button size="sm" onClick={() => dispatch(likeBlog(blog))}>
          like
        </Button>
      </div>
      <div>added by {blog.user?.name ?? blog.user?.username}</div>
      {canRemove && (
        <Button variant="danger" size="sm" className="mt-2" onClick={handleRemove}>
          remove
        </Button>
      )}

      <h3 className="mt-3">comments</h3>
      <Form onSubmit={handleComment} className="d-flex gap-2 mb-2">
        <Form.Control
          data-testid="comment"
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
        <Button type="submit">add comment</Button>
      </Form>
      <ul>
        {blog.comments?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
