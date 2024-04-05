import { ModelBlog } from "../models/blogModel.js"
import ModelUser from "../models/userModel.js"

export const getAllBlogs = async (req, res) => {
  try {
    const data = await ModelBlog.find({}).populate('user', { blogs: 0 })

    return res.json({ ok: true, data })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ ok: false, error: 'Error' })
  }
}

export const getBlogByOne = async (req, res) => {
  try {

    if (!req.params) return res.status(400).json({ ok: false, error: 'params missing' })

    const { id } = req.params

    if (!id) return res.status(400).json({ ok: false, error: 'id not provided' })

    const data = await ModelBlog.findById({ _id: id })

    if (!data) return res.status(404).json({ ok: false, error: 'blog not found' })

    return res.json({ ok: true, data })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ ok: false, error: 'Error' })
  }
}

export const postBlog = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ ok: false, error: 'body missing' })

    const { title, author, url } = req.body

    if (!(title && author && url)) return res.status(400).json({ ok: false, error: 'some data missing' })

    const data = {
      url,
      title,
      likes: 0,
      author,
      user: req.user.id
    }

    const newBlog = await ModelBlog.create(data)
    console.log(req.user)

    const blogs = req.user.blogs.concat(newBlog.id)

    await ModelUser.findOneAndUpdate({ _id: req.user.id }, { blogs })

    data.id = newBlog._id

    return res.status(201).json({ ok: true, data })

  } catch (error) {
    console.log(error)
    return res.status(400).json({ ok: false, error: error.message })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(401).json({
        ok: false,
        error: 'Id blog not provided'
      })
    }

    const blogFound = await ModelBlog.findById({ _id: id }).populate('user', { password: 0, blogs: 0 })

    if (!blogFound) {
      return res.status(404).json({
        ok: false,
        error: 'Blog not found'
      })
    }

    if (!(blogFound.user.id === req.user.id)) {
      return res.status(403).json({
        ok: false,
        message: 'User unauthorized to delete this blog'
      })
    }

    const data = await ModelBlog.findByIdAndDelete({ _id: id })

    return res.status(204).json({ ok: true, data })
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}


export const updateLike = async (req, res) => {
  try {
    const { id } = req.params

    const { likes } = req.body

    if (!id) {
      return res.status(401).json({
        ok: false,
        error: 'Id blog not provided'
      })
    }

    const blogFound = await ModelBlog.findById({ _id: id })

    if (!blogFound) {
      return res.status(404).json({
        ok: false,
        error: 'Blog not found'
      })
    }

    const data = await ModelBlog.findByIdAndUpdate({ _id: id }, { likes: likes + 1 }, { new: true })

    return res.status(204).json({ ok: true, data })
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }
}