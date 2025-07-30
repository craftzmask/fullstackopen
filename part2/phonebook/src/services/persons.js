import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const create = (object) => {
  return axios.post(baseUrl, object).then(res => res.data)
}

const remove = (object) => {
  return axios.delete(`${baseUrl}/${object.id}`)
}

export default { getAll, create, remove }