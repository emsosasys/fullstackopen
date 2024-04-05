import ModelUser from '../models/userModel.js'


export const getOneUser = async (req, res) => { }

export const getUsers = async (req, res) => {
  try {
    const users = await ModelUser.find({}).populate('blogs', { user: 0 })

    res.json({ ok: true, data: users })

  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}