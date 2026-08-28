import { useRef } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { createBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const blogs = useSelector(state =>
    state.blogs.toSorted((a, b) => b.likes - a.likes)
  )

  const addBlog = async blog => {
    await dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>blogs</h2>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <Table striped className="mt-3">
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id} className="blog">
              <td>
                <Link to={`/blogs/${blog.id}`} className="blog-title">
                  {blog.title}
                </Link>
              </td>
              <td className="blog-author">{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
