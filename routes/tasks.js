const express = require('express');

const tasksController = require('../controllers/tasks');

const router = express.Router();

router.get('/add-task', tasksController.getAddTasks);

router.post('/add-task', tasksController.postAddTasks);

router.get('/edit-task/:taskId', tasksController.getEditTasks);

router.post('/edit-task', tasksController.postEditTasks);

router.post('/delete-task', tasksController.postDeleteTasks);

module.exports = router;