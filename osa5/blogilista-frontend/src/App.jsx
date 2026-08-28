import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog.jsx'
import BlogForm from './components/BlogForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'
import blogService from './services/blogs.js'
import loginService from './services/login.js'

const STORAGE_KEY = 'loggedBlogappUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(() =>
    JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
  )
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(setBlogs)
  }, [])

  useEffect(() => {
    blogService.setToken(user?.token ?? null)
  }, [user])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser))
      setUser(loggedUser)
      setUsername('')
      setPassword('')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const createBlog = async newBlog => {
    try {
      const created = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(created))
      notify(`a new blog ${created.title} by ${created.author} added`)
    } catch {
      notify('creating a blog failed', 'error')
    }
  }

  const likeBlog = async blog => {
    const updated = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id ?? blog.user,
    })

    setBlogs(blogs.map(b => (b.id === updated.id ? { ...updated, user: blog.user } : b)))
  }

  const removeBlog = async blog => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      notify(`removed ${blog.title}`)
    } catch {
      notify('removing the blog failed', 'error')
    }
  }

  if (!user) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          onUsernameChange={event => setUsername(event.target.value)}
          password={password}
          onPasswordChange={event => setPassword(event.target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name ?? user.username} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={likeBlog}
            onRemove={removeBlog}
            canRemove={
              !blog.user || blog.user.username === user.username
            }
          />
        ))}
    </div>
  )
}

export default App
