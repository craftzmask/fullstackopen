const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

const blogURI = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(listHelper.blogs)
})

test('return correct number of blogs', async () => {
  const res = await api.get(blogURI)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(listHelper.blogs.length, res.body.length)
})

test.only('each blog has its own id', async () => {
  const res = await api.get(blogURI)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  res.body.forEach(blog =>
    assert.strictEqual(blog.hasOwnProperty('id'), true)
  )
})

after(() => {
  mongoose.connection.close()
})