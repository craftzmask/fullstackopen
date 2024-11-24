import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reducers/userReducer'

const Menu = () => {
  const currentUser = useSelector((state) => state.user)
  const dispatch = useDispatch()

  return (
    <div
      style={{
        background: '#dedede',
        padding: 5,
      }}
    >
      <Link to='/'>blogs</Link> <Link to='/users'>users</Link>{' '}
      <span>
        {currentUser.name} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </span>
    </div>
  )
}

export default Menu
