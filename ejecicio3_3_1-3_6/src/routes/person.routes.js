const express = require('express')
const {
  getAllPersons,
  getPersonById,
  deletePersonById,
  createPerson,
  updatePersonById
} = require('../controllers')

const personRoutes = express.Router()

personRoutes
  .post('/', createPerson)
  .patch('/:id', updatePersonById)
  .get('/', getAllPersons)
  .get('/:id', getPersonById)
  .delete('/:id', deletePersonById)

module.exports = personRoutes