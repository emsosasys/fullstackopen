import {  configureStore } from '@reduxjs/toolkit'
import { notificationSlice, blogsSlice } from './slices'

export const store = configureStore({
  reducer: {
    notification: notificationSlice.reducer,
    blogs: blogsSlice.reducer
  }
})