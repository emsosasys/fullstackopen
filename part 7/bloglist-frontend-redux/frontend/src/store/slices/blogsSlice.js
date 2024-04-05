import { createSlice } from '@reduxjs/toolkit'

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    initialBlogs: (state, { payload }) => {
      return state.concat(payload)
    },

    createBlog: (state, { payload }) => {
      return state.concat(payload)
    },

    deleteBlog: (state, { payload: blogId }) => {
      return state.filter((blog) => blog.id !== blogId)
    },

    updateBlogLikes: (state, { payload: blogId }) => {
      return state
      .map((blog) => blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog)
    }
  }
})

export const { initialBlogs, createBlog, deleteBlog, updateBlogLikes } = blogsSlice.actions