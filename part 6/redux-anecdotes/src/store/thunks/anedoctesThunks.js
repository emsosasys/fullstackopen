import anedoctesService from '../../services/anedoctes'
import { appendAnedocte, setAnedoctes, updateVotes } from '../slices/anedoctesSlice'

export const initializeAnedoctes = () => {
  return async (dispatch) => {
    const anecdotes = await anedoctesService.getAll()

    dispatch(setAnedoctes(anecdotes))
  }
}

export const createAnedocte = (content) => {
  return async (dispatch) => {
    const newAnedocte = await anedoctesService.createAnedocte(content)
    dispatch(appendAnedocte(newAnedocte))
  }
}