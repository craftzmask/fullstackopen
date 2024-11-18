import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author by default', () => {
  const blog = {
    title: 'React Patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  }

  const { container } = render(<Blog blog={blog} />)
  const element = container.querySelector('.blog-detail')
  expect(element).toBeNull()
})