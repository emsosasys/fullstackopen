const PersonModel = require("../mongo")

let persons = []

const getAllPersons = async (req, res) => {

  const data = await PersonModel.find({})

  return res.json(data)
}

const getPersonById = async (req, res) => {
  const { id } = req.params

  if (!id) return res.status(403).json({ mesages: 'Error person no provided.' })

  const result = await PersonModel.findById({ _id: id })

  if (!result) return res.status(404).json({ mesages: 'person not found.' })

  return res.json(result)
}

const deletePersonById = async (req, res) => {
  const { id } = req.params

  if (!id) return res.status(403).json({ mesages: 'Error person no provided.' })

  const result = PersonModel.findById({ _id: id })

  console.log(result)

  if (!result) return res.status(404).json({ mesages: 'person not found.' })

  const resu = await PersonModel.deleteOne({ _id: id })

  console.log(resu)

  return res.json({ message: 'Success' })
}

const createPerson = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      error: 'body missing'
    })
  }

  const { name, number } = req.body

  await PersonModel.create({ name, number })

  return res.json(persons)
}

const updatePersonById = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      error: 'body missing'
    })
  }

  const { id, number } = req.body

  const person = await PersonModel.findById({ _id: id })

  if (!person) return res.status(400).json({ message: 'person not found' })

  await PersonModel.updateOne({ _id: id }, { number })

  return res.json(persons)
}

module.exports = {
  createPerson,
  deletePersonById,
  deletePersonById,
  getAllPersons,
  getPersonById,
  updatePersonById
}