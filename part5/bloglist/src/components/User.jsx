import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
  const users = useSelector((state) => state.users)

  const match = useMatch('/users/:id')
  const user = match ? users.find((u) => u.id === match.params.id) : null

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <p>
        <strong>added blogs</strong>
      </p>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
