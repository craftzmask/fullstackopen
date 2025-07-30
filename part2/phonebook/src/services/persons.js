import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const create = (object) => {
  return axios.post(baseUrl, object).then(res => res.data)
}

export default { getAll, create }