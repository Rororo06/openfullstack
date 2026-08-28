import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onRemove, canRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  return (
    <div className="blog" style={{ border: '1px solid', padding: 5, marginBottom: 5 }}>
      <div>
        <span className="blog-title">{blog.title}</span>{' '}
        <span className="blog-author">{blog.author}</span>{' '}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            likes <span className="blog-likes">{blog.likes}</span>{' '}
            <button onClick={() => onLike(blog)}>like</button>
          </div>
          <div>{blog.user?.name ?? blog.user?.username}</div>
          {canRemove && <button onClick={() => onRemove(blog)}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool,
}

export default Blog
