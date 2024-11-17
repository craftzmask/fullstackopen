import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = () => {
  return {
    headers: { Authorization: token }
  }
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const createBlog = newBlog => {
  const req = axios.post(baseUrl, newBlog, config())
  return req.then(res => res.data)
}

export default { getAll, createBlog, setToken }