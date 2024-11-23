import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

let container = null
let mockHandler = null

beforeEach(() => {
  const user = {
    username: 'jonnyhuynh',
    name: 'Johnny Huynh',
    id: '123123123123123',
  }

  const blog = {
    title: 'React Patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user,
  }

  mockHandler = vi.fn()

  container = render(
    <Blog blog={blog} currentUser={user} onLikeClick={mockHandler} />
  ).container
})

test('renders title and author by default', () => {
  const element = container.querySelector('.blog-detail')
  expect(element).toBeNull()
})

test('renders url and likes after click view button', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('view')

  await user.click(button)

  const element = screen.getByTestId('blog-detail')
  expect(element).not.toBeNull()

  const blogUrl = screen.getByTestId('blog-url')
  expect(blogUrl).not.toBeNull()

  const blogLikes = screen.getByTestId('blog-likes')
  expect(blogLikes).not.toBeNull()
})

test('like button clicks twice', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('view')

  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
