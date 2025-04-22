
const mongoose = require('mongoose');

/*** Sub Schema Definition ****/
const userSubSchema = new mongoose.Schema(
    {
        userID: { type: String, required: true, trim: true },
        userName: { type: String, required: true, trim: true },
    },
    {
        _id: false
    }
);


/********************* Schema Definition **********************/
const task = new mongoose.Schema({

    taskID: { type: String, unique: true, required: true, trim: true },
    name: { type: String, required: true, maxlength: 30, trim: true, unique: true },
    description: { type: String, required: true }, 
    assignedTo: { type: userSubSchema }, 
    deadline: { type: String, required: true }, 
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    }, 
    isDeleted: { type: Boolean, default: false }

}, {
    timestamps: true,
})


const taskModel = mongoose.model('task', task);
module.exports = taskModel;