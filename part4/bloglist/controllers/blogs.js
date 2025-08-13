const blogRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const blog = new Blog(request.body)
  const user = request.user

  blog.user = user._id
  const savedBlog = await blog.save()

  user.blogs.push(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', { blogs: 0 });

  response.status(201).json(populatedBlog)
})

blogRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { ...request.body },
    { new: true }
  )

  response.json(blog)
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

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
