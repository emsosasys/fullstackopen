import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import ModelUser from '../models/userModel.js'

export const signup = async (req, res) => {
  try {
    const { username, password, name } = req.body

    if (!(username && password && name)) {
      return res.status(400).json({ ok: false, error: 'User data is missing.' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new ModelUser({
      username,
      password: hashedPassword,
      name
    })

    const savedUser = await newUser.save()

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    res.status(201).json({ ok: true, user: { username: savedUser.username, name: savedUser.name }, token })

  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!(username && password)) {
      return res.status(400).json({ ok: false, error: 'Username and password are required.' })
    }

    const user = await ModelUser.findOne({ username })
    if (!user) {
      return res.status(400).json({ ok: false, error: 'Invalid username or password.' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ ok: false, error: 'Invalid username or password.' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    res.json({ ok: true, user: { username: user.username, name: user.name }, token })

  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}
