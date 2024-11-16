const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  let mostLikeIndex = 0
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[mostLikeIndex].likes < blogs[i].likes) {
      mostLikeIndex = i
    }
  }

  return {
    title: blogs[mostLikeIndex].title,
    author: blogs[mostLikeIndex].author,
    likes: blogs[mostLikeIndex].likes
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null
  
  return _.chain(blogs)
    .countBy('author')
    .map((value, key) => ({ author: key, blogs: value }))
    .maxBy('blogs')
    .value()
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}