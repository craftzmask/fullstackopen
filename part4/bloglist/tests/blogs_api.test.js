const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')
const blog = require('../models/blog')

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

test('each blog has its own id', async () => {
  const res = await api.get(blogURI)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  res.body.forEach(blog =>
    assert.strictEqual(blog.hasOwnProperty('id'), true)
  )
})

test('a valid blog can be added', async () => {
  await api.post(blogURI)
    .send({
      title: 'Atomic CSS Modules',
      author: 'Michele Bertoli',
      url: 'https://medium.com/@michelebertoli',
      likes: 100,
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogs = await listHelper.blogsInDb()
  assert.strictEqual(blogs.length, listHelper.blogs.length + 1)
  assert.strictEqual(blogs.map(b => b.title).includes('Atomic CSS Modules'), true)
})

test('likes default to 0 if missing', async () => {
  const res = await api.post(blogURI)
    .send({
      title: 'Atomic CSS Modules',
      author: 'Michele Bertoli',
      url: 'https://medium.com/@michelebertoli'
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(res.body.hasOwnProperty('likes'), true)
  assert.strictEqual(res.body.likes, 0)
})

test.only('cannot add without name or url', async () => {
  await api.post(blogURI)
    .send({
      author: 'Michele Bertoli',
      url: 'https://medium.com/@michelebertoli'
    })
    .expect(400)

  await api.post(blogURI)
    .send({
      title: 'Atomic CSS Modules',
      author: 'Michele Bertoli',
    })
    .expect(400)
  
  const blogs = await listHelper.blogsInDb()
  assert.strictEqual(blogs.length, listHelper.blogs.length)
})


after(() => {
  mongoose.connection.close()
})