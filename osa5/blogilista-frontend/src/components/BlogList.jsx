import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => (
  <div>
    <h2>blogs</h2>
    {[...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map(blog => (
        <div key={blog.id} className="blog">
          <Link className="blog-title" to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>{' '}
          <span className="blog-author">{blog.author}</span>
        </div>
      ))}
  </div>
)

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default BlogList
