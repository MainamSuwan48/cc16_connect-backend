const express = require('express')
const router = express.Router()
const homeworkController = require('../controllers/homework-controller')
const authenticate = require('../middlewares/authenticate')

router.post('/', authenticate, homeworkController.createHomework)

module.exports = router