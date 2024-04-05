import express from 'express'
import { signup, login } from '../controllers/auth.controllers.js'

export const authRouter = express.Router()

authRouter
  .post('/signup', signup)
  .post('/login', login)