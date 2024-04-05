import serviceBlogs from '../../services/blogs'
import { createBlog, deleteBlog, initialBlogs, updateBlogLikes } from '../slices/blogsSlice'

export const getAllBlogs = (user) => {
  return async (dispatch) => {
    try {
      const result = await serviceBlogs.getAll(user)

      dispatch(initialBlogs(result))
    } catch (e) {}
  }
}

export const createNewBlog = (user, newBlog) => {
  return async (dispatch) => {
    try {
      const result = await serviceBlogs.createBlog(user, newBlog)
      dispatch(createBlog(result))
    } catch (e) { }
  }
}

export const deleteBlogById = (user, blogId) => {
  return async (dispatch) => {
    try {
      await serviceBlogs.deleteBlog(user, blogId)

      dispatch(deleteBlog(blogId))
    } catch (e) {}
  }
}

export const updateBlogLikeById = (user, likes, blogId) => {
  return async (dispatch) => {
    try {
      await serviceBlogs.updateLikes(user, likes, blogId)

      dispatch(updateBlogLikes(blogId))
    } catch (e) {}
  }
}