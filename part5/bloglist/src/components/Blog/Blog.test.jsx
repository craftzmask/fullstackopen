import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect, test } from 'vitest'

const user = {
  id: '64f1c2e8a1b4c9d5e7f12345',
  username: 'johndoe',
  name: 'John Doe'
}

const blog = {
  author: 'Jane Doe',
  title: 'Mastering Distributed Systems',
  url: 'https://example.com/mastering-distributed-systems',
  likes: 120,
  user
}

describe('Render Blog component', () => {
  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} />).container
  })

  test('blog shows title and author by default', () => {
    const blogTitle = container.querySelector('.blog__title')
    const blogAuthor = container.querySelector('.blog__author')
    const blogUrl = container.querySelector('.blog__url')
    const blogLikes = container.querySelector('.blog__likes')

    expect(blogTitle).toHaveTextContent(blog.title)
    expect(blogAuthor).toHaveTextContent(blog.author)
    expect(blogUrl).toBeNull()
    expect(blogLikes).toBeNull()
  })

  test('blog shows url and likes after clicked \'show\' button', async () => {
    const blogTitle = container.querySelector('.blog__title')
    const blogAuthor = container.querySelector('.blog__author')
    let blogUrl = container.querySelector('.blog__url')
    let blogLikes = container.querySelector('.blog__likes')

    expect(blogTitle).toHaveTextContent(blog.title)
    expect(blogAuthor).toHaveTextContent(blog.author)
    expect(blogUrl).toBeNull()
    expect(blogLikes).toBeNull()

    const user = userEvent.setup()
    const showButton = container.querySelector('.blog__button__show')
    await user.click(showButton)

    blogUrl = container.querySelector('.blog__url')
    blogLikes = container.querySelector('.blog__likes')
    expect(blogUrl).toHaveTextContent(blog.url)
    expect(blogLikes).toHaveTextContent(blog.likes)
  })
})
