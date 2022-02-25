import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlogEntry = async (blogPost) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blogPost, config)
  return response.data
}

const updateLike = async (blogPost, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogPost)
  return response.data
}

const deleteBlog = async (infoObj) => {
  const response = await axios.delete(`${baseUrl}/${infoObj.id}`, { data: { source: infoObj } })
  return response.data
}

export default { getAll, createBlogEntry, setToken, updateLike, deleteBlog }