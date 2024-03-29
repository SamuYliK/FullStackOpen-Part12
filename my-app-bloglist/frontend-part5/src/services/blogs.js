import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/blogs`

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const remove = ( id, removeToken ) => {
  const poistuvaToken = `Bearer ${removeToken}`
  const config = {
    headers: { Authorization: poistuvaToken }
  }
  axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, remove, setToken }