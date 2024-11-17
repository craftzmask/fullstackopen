import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = (username, password) => {
  const req = axios.post(baseUrl, { username, password })
  return req.then(res => res.data)
}

export default { login }