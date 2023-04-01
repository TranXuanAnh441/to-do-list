const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultTaskStatus = require('../utils/default').defaultTaskStatus;

const taskSchema = new Schema ({
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
    status: {
        type: String,
        default: defaultTaskStatus[0],
        require: true
    },
    categoryId: {
        type: Schema.Types.ObjectId, 
        ref: 'Category' 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);