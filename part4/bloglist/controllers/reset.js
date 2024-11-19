const router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

router.post('/', async (req, res) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  res.status(200).end()
})

module.exports = router