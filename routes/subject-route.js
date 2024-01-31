const express = require('express')
const router = express.Router()
const subjectController = require('../controllers/subject-controller')

router.get('/', subjectController.getAll)

module.exports = router