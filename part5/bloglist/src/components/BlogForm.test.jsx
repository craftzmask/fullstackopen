import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('submit a new blog form with the right inputs', async () => {
  const user = userEvent.setup()
  const mockHandler = vi.fn()

  const { container } = render(<BlogForm onSubmit={mockHandler} />)

  const titleInput = container.querySelector('#title')
  await user.type(titleInput, 'React Patterns')

  const authorInput = container.querySelector('#author')
  await user.type(authorInput, 'Micheal Chan')

  const urlInput = container.querySelector('#url')
  await user.type(urlInput, 'reactpatterns.com')

  const button = container.querySelector('button')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('React Patterns')
  expect(mockHandler.mock.calls[0][0].author).toBe('Micheal Chan')
  expect(mockHandler.mock.calls[0][0].url).toBe('reactpatterns.com')
})