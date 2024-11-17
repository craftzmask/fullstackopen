const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let user = null

beforeEach(async () => {
  await User.deleteMany({})
  user = await listHelper.createUser()

  await listHelper.createUser('admin', 'admin')

  await Blog.deleteMany({})
  let blogs = listHelper.initialBlogs.map(b => {
    const blog = new Blog({ ...b, user: user._id })
    return blog
  })

  for (const b of blogs) {
    const savedBlog = await b.save()
    user.blogs.push(savedBlog._id)
    await user.save()
  }
})

test('Return correct amount of blog posts', async () => {
  const res = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(res.body.length, listHelper.initialBlogs.length)
})

test('each blog must have an id', async () => {
  const res = await api.get('/api/blogs')

  res.body.forEach(b => assert(!b.hasOwnProperty('_id')))

  res.body.forEach(b => assert(b.hasOwnProperty('id')))
})

test('A valid blog can be added', async () => {
  const res = await api
    .post('/api/login')
    .send({ username: 'root', password: 'root' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${res.body.token}`)
    .send({
      title: "Eloquent JavasSript",
      author: "Marijn Haverbeke",
      url: "https://eloquentjavascript.net/",
      likes: 10
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await listHelper.blogsInDb()
  assert(blogsAtEnd.length, listHelper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Eloquent JavasSript'))
})

test('likes property default to 0', async () => {
  const res = await api.post('/api/blogs')
    .send({
      title: "Eloquent JavasSript",
      author: "Marijn Haverbeke",
      url: "https://eloquentjavascript.net/",
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(res.body.likes, 0)
})

test('missing title cannot be added', async () => {
  await api.post('/api/blogs')
    .send({
      author: "Marijn Haverbeke",
      url: "https://eloquentjavascript.net/",
    })
    .expect(400)

  const blogsAtEnd = await listHelper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, listHelper.initialBlogs.length)
})

test('missing url cannot be added', async () => {
  await api.post('/api/blogs')
    .send({
      title: "Eloquent JavasSript",
      author: "Marijn Haverbeke",
    })
    .expect(400)

  const blogsAtEnd = await listHelper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, listHelper.initialBlogs.length)
})

test('delete a blog by its author', async () => {
  const blogsAtStart = await listHelper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  
  const res = await api.post('/api/login')
    .send({ username: 'root', password: 'root' })
    .expect(200)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${res.body.token}`)
    .expect(204)
  
  const blogsAtEnd = await listHelper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, listHelper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.title)) 
})

test('cannot delete other blogs', async () => {
  const blogsAtStart = await listHelper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  
  const res = await api.post('/api/login')
    .send({ username: 'admin', password: 'admin' })
    .expect(200)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${res.body.token}`)
    .expect(401)
  
  const blogsAtEnd = await listHelper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, listHelper.initialBlogs.length)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes(blogToDelete.title)) 
})

test('update likes of the blog', async () => {
  const blogsAtStart = await listHelper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const res = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(res.body.likes, blogToUpdate.likes + 1)
})

after(async () => {
  await mongoose.connection.close()
})