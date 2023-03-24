const Task = require('../models/task');

exports.getAddTasks = (req, res, next) => {
    res.render('tasks/add-task',  {'pageTitle': 'Add Task', path:'/add-task'});
};

exports.postAddTasks = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const newTask = new Task({title: title, content: content});
    newTask
        .save()
        .then(result => res.redirect('/tasks'))
        .catch(err => console.log(err));
}

exports.getTasks = (req, res, next) => {    
    Task
        .find()
        .then(tasks => {
            res.render('tasks/task-list', {'pageTitle': 'Task list', 'tasks' : tasks, path : '/'});
        })
        .catch(err => console.log(err));
}
