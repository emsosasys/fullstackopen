import { createSlice } from "@reduxjs/toolkit";

export const anedoctesSlice = createSlice({
  name: 'anedotes',
  initialState: [],
  reducers: {

    updateVotes: (state, action) => {
      return state.map((anedocte) => {
        if (anedocte.id === action.payload) {
          return {
            ...anedocte,
            votes: anedocte.votes + 1
          }
        }

        return anedocte
      }).sort((a, b) => b.votes - a.votes)
    },

    createAnedocte: (state, action) => {
      const newAnedocte = action.payload

      return [...state, newAnedocte]
    },

    appendAnedocte: (state, action) => {
      state.push(action.payload)
    },

    setAnedoctes: (state, action) => {
      return action.payload
    }
  }
})

export const { updateVotes, createAnedocte, appendAnedocte, setAnedoctes } = anedoctesSlice.actions