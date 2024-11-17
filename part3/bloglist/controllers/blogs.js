const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const user = require('../models/user')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const users = await User.find({})
  const blog = new Blog({
    ...req.body,
    user: users[0]._id
  })

  const savedBlog = await blog.save()
  
  users[0].blogs.push(savedBlog._id)
  await users[0].save()

  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  )
  res.json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter