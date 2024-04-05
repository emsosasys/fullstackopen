import { configureStore } from '@reduxjs/toolkit'
import { filterSlice } from './slices/filterSlice'
import { anedoctesSlice, setAnedoctes } from './slices/anedoctesSlice'
import anedoctesService from '../services/anedoctes'


export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    anedoctes: anedoctesSlice.reducer
  }
})


anedoctesService.getAll().then((anedoctes) => {
  store.dispatch(setAnedoctes(anedoctes))
})