const blogRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
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
