const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    await new User({ username: 'root', passwordHash }).save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send({ username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen' })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    assert.ok(usersAtEnd.map(user => user.username).includes('mluukkai'))
  })

  test('creation fails with 400 if the username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const response = await api
      .post('/api/users')
      .send({ username: 'root', name: 'Superuser', password: 'salainen' })
      .expect(400)

    assert.match(response.body.error, /unique/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with 400 if the username is too short', async () => {
    const response = await api
      .post('/api/users')
      .send({ username: 'ab', password: 'salainen' })
      .expect(400)

    assert.match(response.body.error, /shorter than the minimum allowed length/)
  })

  test('creation fails with 400 if the password is too short', async () => {
    const response = await api
      .post('/api/users')
      .send({ username: 'validuser', password: 'ab' })
      .expect(400)

    assert.match(response.body.error, /password must be at least 3 characters long/)
  })

  test('login fails with 401 for a wrong password', async () => {
    await api
      .post('/api/login')
      .send({ username: 'root', password: 'wrong' })
      .expect(401)
  })
})

after(async () => {
  await mongoose.connection.close()
})
