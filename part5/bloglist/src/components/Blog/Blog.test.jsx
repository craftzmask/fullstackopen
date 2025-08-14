import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'

test('blog shows title and author by default', () => {
  const blog = {
    author: 'Jane Doe',
    title: 'Mastering Distributed Systems',
    url: 'https://example.com/mastering-distributed-systems',
    likes: 120
  }

  const { container } = render(<Blog blog={blog} />)

  const blogTitle = container.querySelector('.blog__title')
  const blogAuthor = container.querySelector('.blog__author')
  const blogUrl = container.querySelector('.blog__url')
  const blogLikes = container.querySelector('.blog__likes')

  expect(blogTitle).toHaveTextContent(blog.title)
  expect(blogAuthor).toHaveTextContent(blog.author)
  expect(blogUrl).toBeNull()
  expect(blogLikes).toBeNull()
})