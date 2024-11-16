import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const createPerson = newObject => {
  const req = axios.post(baseUrl, newObject)
  return req.then(res => res.data)
}

const updatePerson = updatedObject => {
  const req = axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return req.then(res => res.data)
}

const deletePerson = id => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson
}