const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskStatus = [
    'CREATED',
    'ONGOING',
    'FINISHED'
];

const Task = new Schema ({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status : {
        type: String,
        default: taskStatus[0],
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tasks', Task);