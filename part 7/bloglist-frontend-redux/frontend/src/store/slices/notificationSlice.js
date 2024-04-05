import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  typeNotification: '',
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, { payload }) => {
      return payload
    },
    resetNotification: () => {
      return initialState
    }
  }
})


export const { setNotification, resetNotification } = notificationSlice.actions 