import jwt from 'jsonwebtoken'
import ModelUser from '../models/userModel.js'

export const hasValidToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ ok: false, error: 'Authorization header is required.' })
    }

    const [schema, token] = req.headers.authorization.split(' ')

    if (schema.toLowerCase() !== 'bearer') {
      return res.status(403).json({ ok: false, error: 'Token must be a Bearer token.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await ModelUser.findOne({ _id: decoded.id })

    if (!user) {
      return res.status(401).json({ ok: false, error: 'User or password invalid' })
    }

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({ ok: false, error: 'Invalid token.' })
  }
}

