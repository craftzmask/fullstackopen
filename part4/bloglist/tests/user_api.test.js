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
  await listHelper.createUser()
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
  assert.strictEqual(usersAtEnd.length, 2)

  const usernames = usersAtEnd.map(u => u.username)
  assert(usernames.includes(res.body.username))
})

test('username must be unique', async () => {
  await api
    .post('/api/users')
    .send({
      username: 'root',
      name: 'root',
      password: 'root'
    })
    .expect(400)
  
  const usersAtEnd = await listHelper.usersInDb()
  assert.strictEqual(usersAtEnd.length, 1)
})

test('username too short cannot create', async () => {
  await api
    .post('/api/users')
    .send({
      username: 'a',
      name: 'John',
      password: 'simple'
    })
    .expect(400)

  const usersAtEnd = await listHelper.usersInDb()
  assert.strictEqual(usersAtEnd.length, 1)
})

test('password too short cannot create', async () => {
  await api
    .post('/api/users')
    .send({
      username: 'admin',
      name: 'John',
      password: 's'
    })
    .expect(400)

  const usersAtEnd = await listHelper.usersInDb()
  assert.strictEqual(usersAtEnd.length, 1)
})

test('user can login with valid username and password', async () => {
  await api
    .post('/api/login')
    .send({ username: 'root', password: 'root' })
    .expect(200)
})

after(async () => {
  await mongoose.connection.close()
})