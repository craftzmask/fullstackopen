const router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

router.post('/', async (req, res) => {
  console.log('did I go here?')
  await User.deleteMany({})
  await Blog.deleteMany({})
  res.status(200).end()
})

module.exports = router