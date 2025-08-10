const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'Invalid token'
    })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({
      error: 'User ID is invalid'
    })
  }

  blog.user = user._id
  const savedBlog = await blog.save()

  user.blogs.push(savedBlog._id)
  await user.save()

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
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'Invalid token'
    })
  }

  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== blog._id.toString())
    await user.save()
    return response.status(204).end()
  }

  response.status(401).json({
    error: 'Unauthorized to delete this blog'
  })
})

module.exports = blogRouter
