const _ = require('lodash')
const Blog = require('../models/blog')

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

const mostLikes = blogs => {
  if (blogs.length === 0) return null

  return _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => {
      return {
        author: author,
        likes: _.sumBy(blogs, 'likes')
      }
    })
    .maxBy('likes')
    .value()
}

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
  initialBlogs, blogsInDb
}