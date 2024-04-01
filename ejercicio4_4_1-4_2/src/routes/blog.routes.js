import express from 'express'
import { getAllBlogs, getBlogByOne, postBlog } from '../controllers/blog.controllers.js'

export const blogRouter = express.Router()

blogRouter
  .get('/', getAllBlogs)
  .get('/:id', getBlogByOne)
  .post('/', postBlog)