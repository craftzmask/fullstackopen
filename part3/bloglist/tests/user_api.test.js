const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

test('a valid user can create', async () => {
  const res = await api
    .post('/api/users')
    .send({
      username: 'admin',
      name: 'John',
      password: 'simple'
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await listHelper.usersInDb()
  assert.strictEqual(usersAtEnd.length, listHelper.usersInDb.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  assert(usernames.includes(res.body.username))
})

after(async () => {
  await mongoose.connection.close()
})