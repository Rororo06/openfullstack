import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import BlogForm from './components/BlogForm.jsx'
import BlogList from './components/BlogList.jsx'
import BlogView from './components/BlogView.jsx'
import LoginForm from './components/LoginForm.jsx'
import Navigation from './components/Navigation.jsx'
import Notification from './components/Notification.jsx'
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

  const navigate = useNavigate()

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
      navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    navigate('/')
  }

  const createBlog = async newBlog => {
    try {
      const created = await blogService.create(newBlog)
      setBlogs(blogs.concat(created))
      notify(`a new blog ${created.title} by ${created.author} added`)
      navigate('/')
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
      navigate('/')
    } catch {
      notify('removing the blog failed', 'error')
    }
  }

  return (
    <div className="container">
      <Navigation user={user} onLogout={handleLogout} />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blogs={blogs}
              user={user}
              onLike={likeBlog}
              onRemove={removeBlog}
            />
          }
        />
        <Route
          path="/create"
          element={
            user ? <BlogForm createBlog={createBlog} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate replace to="/" />
            ) : (
              <LoginForm
                onSubmit={handleLogin}
                username={username}
                onUsernameChange={event => setUsername(event.target.value)}
                password={password}
                onPasswordChange={event => setPassword(event.target.value)}
              />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
