import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'

import { authRouter, blogRouter, usersRouter } from './routes/index.js'
import { hasValidToken } from './midlewares/hasValidToken.js'

export const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/blogs', hasValidToken, blogRouter)
app.use('/api/users', usersRouter)