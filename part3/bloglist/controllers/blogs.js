const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const token = jwt.verify(req.token, process.env.SECRET)

  if (!token.id) {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }

  const user = await User.findById(token.id)

  const blog = new Blog({
    ...req.body,
    user: user._id
  })

  const savedBlog = await blog.save()
  
  user.blogs.push(savedBlog._id)
  await user.save()

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