const express = require('express');

const tasksController = require('../controllers/tasks');

const router = express.Router();

router.get('/add-task', tasksController.getAddTasks);

router.post('/add-task', tasksController.postAddTasks);

router.get('/', tasksController.getTasks);

module.exports = router;