const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const user = req.user

  const blog = new Blog({
    ...req.body,
    user: user._id
  })

  let savedBlog = await blog.save()
  savedBlog = await savedBlog.populate('user')
  
  user.blogs.push(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = await Blog
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('user', { username: 1, name: 1 })

  res.json(blog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user

  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(req.params.id)
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== req.params.id)
    await user.save()
    return res.status(204).end()
  }

  res.status(401).json({ error: 'Unauthorized' })
})

module.exports = blogsRouter