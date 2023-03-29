const express = require('express');

const categoryController = require('../controllers/category');

const router = express.Router();

router.get('/add-category', categoryController.getAddCategory);

router.post('/add-category', categoryController.postAddCategory);

// router.get('/edit-task/:taskId', tasksController.getEditTasks);

// router.post('/edit-task', tasksController.postEditTasks);

// router.post('/delete-task', tasksController.postDeleteTasks);

module.exports = router;