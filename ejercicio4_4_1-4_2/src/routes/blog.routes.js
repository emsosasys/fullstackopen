import express from 'express'
import { deleteBlog, getAllBlogs, getBlogByOne, postBlog, updateLike } from '../controllers/blog.controllers.js'

export const blogRouter = express.Router()

blogRouter
  .get('/', getAllBlogs)
  .get('/:id', getBlogByOne)
  .post('/', postBlog)
  .delete('/:id', deleteBlog)
  .put('/:id', updateLike)