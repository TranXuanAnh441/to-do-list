const Task = require('../models/task');

exports.getAddTasks = (req, res, next) => {
    res.render('tasks/edit-task',  {'pageTitle': 'Add Task', editing: false, path:'/add-task'});
};

exports.postAddTasks = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const newTask = new Task({title: title, content: content});
    newTask
        .save()
        .then(result => res.redirect('/'))
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

exports.getEditTasks = (req, res, next) => {
    const editMode = req.query.edit;
    if (editMode!="true") {
        res.redirect('/');
    }

    const taskId = req.params.taskId;
    Task
        .findById(taskId)
        .then(task => {
            if (!task) {
                return res.redirect('/');
            }
            res.render('tasks/edit-task', { 
                pageTitle:"Edit Task", 
                path:'/task/edit-task',
                editing: true,
                task: task
            });
        })
        .catch(err => console.log(err));
    };

exports.postEditTasks = (req, res, next) => {
    const id = req.body.taskId;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    
    Task.findById(id).then(task => {
        task.title = updatedTitle;
        task.content = updatedContent;
        task.save();
        })
        .then(result => {
            console.log('UPDATED TASK!');
            res.redirect('/');
        })
        .catch(err => console.log(err));
}

exports.postDeleteTasks = (req, res, next) => {
    const taskId = req.body.taskId;
    Task.findByIdAndRemove(taskId)
    .then(result => {
        console.log('DESTROYED TASK');
        res.redirect('/');
    })
    .catch(err=>console.log(err) ); 
}