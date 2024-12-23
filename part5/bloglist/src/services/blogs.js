import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const config = () => {
  return {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => res.data)
}

const createBlog = async (newBlog) => {
  const res = await axios.post(baseUrl, newBlog, config())
  return res.data
}

const updateBlog = async (id, updatedBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return res.data
}

const deleteBlog = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, config())
  return res.data
}

const postComment = async (id, content) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, { content })
  return res.data
}

export default {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken,
  postComment,
}
