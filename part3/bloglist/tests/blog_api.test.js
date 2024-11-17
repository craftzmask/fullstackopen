const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogs = listHelper.initialBlogs.map(b => new Blog(b))
  blogs = blogs.map(b => b.save())
  await Promise.all(blogs)
})

test('Return correct amount of blog posts', async () => {
  const res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(res.body.length, listHelper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})