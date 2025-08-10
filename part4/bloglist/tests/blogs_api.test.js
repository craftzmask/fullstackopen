const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(listHelper.blogs)
})

test.only('return correct number of blogs', async () => {
  const res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(listHelper.blogs.length, res.body.length)
})

after(() => {
  mongoose.connection.close()
})