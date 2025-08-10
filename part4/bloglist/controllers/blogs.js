const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const users = await User.find({})

  blog.user = users[0]._id
  const savedBlog = await blog.save()

  users[0].blogs.push(savedBlog._id)
  await users[0].save()

  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { ...request.body },
    { new: true }
  )

  response.json(blog)
})

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter
