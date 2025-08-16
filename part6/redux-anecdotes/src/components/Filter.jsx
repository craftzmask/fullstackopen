import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(filter(e.target.value))
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor="filter">filter</label>
      <input
        type="text"
        id="filter"
        onChange={handleChange} />
    </div>
  )
}

export default Filter