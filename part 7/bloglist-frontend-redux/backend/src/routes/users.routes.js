import express from 'express'
import { getUsers } from '../controllers/users.controllers.js'

export const usersRouter = express.Router()

usersRouter
  .get('/', getUsers)