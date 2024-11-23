import { useEffect, useState } from 'react'
import usersService from '../services/users'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll().then((data) => setUsers(data))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
