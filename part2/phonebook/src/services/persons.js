import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(res => res.data)
}

const create = personObject => {
  return axios.post(baseUrl, personObject)
    .then(res => res.data)
}

const update = person => {
  return axios.put(`${baseUrl}/${person.id}`, person)
    .then(res => res.data)
}

const remove = person => {
  return axios.delete(`${baseUrl}/${person.id}`)
}

export default { getAll, create, update, remove }