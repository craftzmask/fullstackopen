import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const AnecdoteForm = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }
  
  const reset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.props} />
        </div>
        <div>
          author
          <input name='author' {...author.props} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.props} />
        </div>
        <button>create</button>
        <button type='button' onClick={reset}>
          reset
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm