import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = newToken ? `Bearer ${newToken}` : null
}

const authConfig = () => ({ headers: { Authorization: token } })

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newBlog =>
  axios.post(baseUrl, newBlog, authConfig()).then(response => response.data)

const update = (id, blog) =>
  axios.put(`${baseUrl}/${id}`, blog).then(response => response.data)

const remove = id =>
  axios.delete(`${baseUrl}/${id}`, authConfig()).then(response => response.data)

export default { getAll, create, update, remove, setToken }
