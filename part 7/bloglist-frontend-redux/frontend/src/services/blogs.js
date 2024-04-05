import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = (user = {}) => {
  const request = axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  })
  return request.then(response => response.data.data)
}


const createBlog = (user = {}, blog) => {
  const request = axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    }
  })

  return request.then(response => response.data.data)
}

const updateLikes = (user = {}, likes, id) => {
  const request = axios.put(`/${id}`, { likes }, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    },
    baseURL: baseUrl,
  })

  return request.then(response => response.data.data)
}

const deleteBlog = (user = {}, id) => {
  const request = axios.delete(`${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`
    },
    baseURL: baseUrl,
  })

  return request.then(response => response.data.data)
}

export default { getAll, createBlog, updateLikes, deleteBlog }