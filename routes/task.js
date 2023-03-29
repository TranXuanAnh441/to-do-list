const express = require('express');

const taskController = require('../controllers/task');

const router = express.Router();

router.get('/add-task', taskController.getAddTasks);

router.post('/add-task', taskController.postAddTasks);

router.get('/edit-task/:taskId', taskController.getEditTasks);

router.post('/edit-task', taskController.postEditTasks);

router.post('/delete-task', taskController.postDeleteTasks);

module.exports = router;