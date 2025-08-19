import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const get = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const create = async (object) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(baseUrl, object, config);
  return response.data;
};

const update = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object);
  return response.data;
};

const remove = async (object) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${baseUrl}/${object.id}`, config);
  return response.data;
};

const comment = async (blogId, text) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { text });
  return response.data;
};

export default { getAll, get, create, update, remove, comment, setToken };
