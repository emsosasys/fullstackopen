import axios from "axios"

const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const data = (await axios.get(baseURL)).data

  return data
}

export const createAnecdote = async newAnecdote => {
  const data = (await axios.post(baseURL, newAnecdote)).data

  return data
}

export const updateAnecdote = async (updatedAnecdote) => {
  return axios
    .put(`${baseURL}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data)
}