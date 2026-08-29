import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

const BlogView = ({ blogs, user, onLike, onRemove }) => {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  const addedBy = blog.user?.name ?? blog.user?.username
  const isCreator = !blog.user || blog.user.username === user?.username

  return (
    <div className="blog-details">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span className="blog-likes">{blog.likes}</span> likes{' '}
        {user && <button onClick={() => onLike(blog)}>like</button>}
      </div>
      {addedBy && <div>added by {addedBy}</div>}
      {user && isCreator && <button onClick={() => onRemove(blog)}>remove</button>}
    </div>
  )
}

BlogView.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default BlogView
