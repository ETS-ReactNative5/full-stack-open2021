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
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, blogPost, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlogEntry, setToken }