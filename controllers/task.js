const Task = require('../models/task');
const Category = require('../models/category');
const defaultTaskStatus = require('../utils/default').defaultTaskStatus;

exports.getTasks = (req, res, next) => {
    const displayMode = req.query.display;
    let taskDisplay;
    Task
    .find()
    .then(tasks => {
        const tasksList = tasks.map(task => {
            task.deadlineStr = `${task.deadline.getFullYear()}-${(task.deadline.getMonth()+1).toString().padStart(2, "0")}-${task.deadline.getDate().toString().padStart(2, "0")}`;
            return task;
        })
        Category
        .find()
        .then(categories => {
            for(categoryIndex in categories) {
                const category = categories[categoryIndex];
                for(const taskIndex in tasksList) {    
                    const task = tasksList[taskIndex];
                    if(task.categoryId.toString()===category._id.toString()) {
                        task.category = category
                    }
                }
            }

            let displayTemplate;
            if (displayMode==='status') {
                displayTemplate = './task-by-status.ejs';
                let statusTasks = {};
                for(defaultTaskStatusIndex in defaultTaskStatus) {
                    const status = defaultTaskStatus[defaultTaskStatusIndex];
                    statusTasks[status] = [] 
                }
                for(taskIndex in tasksList) {
                    const task = tasksList[taskIndex];
                    statusTasks[task.status].push(task);
                }
                taskDisplay = statusTasks;
            } else if(displayMode==='category') {
                displayTemplate = './task-by-category.ejs';
                let categoryTasks = {};
                for(categoryIndex in categories) {
                    const category = categories[categoryIndex];
                    categoryTasks[category.name] = [];
                }
                for(taskIndex in tasksList) {
                    const task = tasksList[taskIndex];
                    categoryTasks[task.category.name].push(task);
                }
                taskDisplay = categoryTasks;
            } else {
                displayTemplate = './task-by-time.ejs';
                if(displayMode==='deadline') {
                    tasksList.sort(function(a,b){return a.deadline - b.deadline});
                } else {
                    tasksList.sort(function(a,b){return a.createdAt - b.createdAt});
                }
                taskDisplay = tasksList;
            }
            res.render('tasks/task-list', {
                pageTitle: 'Task list', 
                tasks: taskDisplay,
                displayTemplate: displayTemplate,
                displayMode: displayMode,
                path : '/',
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

exports.getAddTasks = (req, res, next) => {
    Category
    .find()
    .then(categoryList => {
        res.render('tasks/edit-task',  {
            pageTitle: 'Add Task', 
            editing: false, 
            path:'/add-task',
            statusList: defaultTaskStatus,
            categoryList: categoryList,
        });
    });
};

exports.postAddTasks = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const deadline = req.body.deadline;
    const status = req.body.status;
    const categoryId = req.body.categoryId;
    const newTask = new Task({
        title: title, 
        content: content, 
        deadline: deadline, 
        status: status,
        categoryId: categoryId
    });

    newTask
    .save()
    .then(result => { res.redirect('/');})
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
            task.deadlineStr = `${task.deadline.getFullYear()}-${(task.deadline.getMonth()+1).toString().padStart(2, "0")}-${task.deadline.getDate().toString().padStart(2, "0")}`;
            Category
                .find()
                .then(categoryList => {
                    res.render('tasks/edit-task', { 
                        pageTitle:"Edit Task", 
                        path:'/task/edit-task',
                        editing: true,
                        task: task,
                        statusList: defaultTaskStatus,
                        categoryList: categoryList,
                    });
            });
        })
        .catch(err => console.log(err));
    };

exports.postEditTasks = (req, res, next) => {
    const id = req.body.taskId;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    const updatedDeadline = req.body.deadline;
    const updatedStatus = req.body.status;
    const updatedCategoryId = req.body.categoryId;
    
    Task.findById(id).then(task => {
        task.title = updatedTitle;
        task.content = updatedContent;
        task.deadline = updatedDeadline;
        task.status = updatedStatus;
        task.categoryId = updatedCategoryId;
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
    .catch(err=>console.log(err)); 
}