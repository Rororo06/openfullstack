const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salainen', 10)
  const user = await new User({ username: 'root', passwordHash }).save()

  const login = await api
    .post('/api/login')
    .send({ username: 'root', password: 'salainen' })

  token = login.body.token

  await Blog.insertMany(
    helper.initialBlogs.map(blog => ({ ...blog, user: user._id }))
  )
})

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs are identified by id, not _id', async () => {
    const response = await api.get('/api/blogs')

    for (const blog of response.body) {
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    }
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data and a token', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
    assert.ok(blogs.map(blog => blog.title).includes('Type wars'))
  })

  test('fails with 401 if a token is not provided', async () => {
    await api
      .post('/api/blogs')
      .send({ title: 'No token', url: 'http://example.com' })
      .expect(401)

    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, helper.initialBlogs.length)
  })

  test('defaults likes to zero when the property is missing', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'No likes', url: 'http://example.com' })
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  test('fails with 400 if title or url is missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ author: 'No title', url: 'http://example.com' })
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'No url' })
      .expect(400)

    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with 204 when the creator deletes it', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    assert.ok(!blogsAtEnd.map(blog => blog.id).includes(blogToDelete.id))
  })

  test('fails with 403 when another user tries to delete it', async () => {
    const passwordHash = await bcrypt.hash('salainen', 10)
    await new User({ username: 'other', passwordHash }).save()

    const login = await api
      .post('/api/login')
      .send({ username: 'other', password: 'salainen' })

    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${blogsAtStart[0].id}`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(403)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

describe('updating a blog', () => {
  test('succeeds in changing the number of likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, likes: blogToUpdate.likes + 10 })
      .expect(200)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)
  })

  test('fails with 404 for a blog that no longer exists', async () => {
    const id = await helper.nonExistingId()

    await api.put(`/api/blogs/${id}`).send({ title: 'gone', url: 'x' }).expect(404)
  })
})

describe('commenting on a blog', () => {
  test('succeeds without a token', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const response = await api
      .post(`/api/blogs/${blogsAtStart[0].id}/comments`)
      .send({ comment: 'nice post' })
      .expect(201)

    assert.deepStrictEqual(response.body.comments, ['nice post'])
  })

  test('fails with 400 when the comment is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api.post(`/api/blogs/${blogsAtStart[0].id}/comments`).send({}).expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
