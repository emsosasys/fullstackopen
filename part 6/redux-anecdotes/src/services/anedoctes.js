import axios from 'axios'

const BASE_URL = "http://localhost:3001/anecdotes"

const getAll = async () => {
  return (await axios.get(BASE_URL)).data
}

const createAnedocte = async (content) => {
  const object = {
    content,
    votes: 0,
  }

  return (await axios.post(BASE_URL, object)).data
}

export default { getAll, createAnedocte } 