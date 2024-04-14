const  mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title: String,
        createdAt:{
            type: Date,
            default: Date.now,
            select: false
        },
        updatedAt:{
            type: Date,
            default: Date.now,
            select: false
        }
    },
    {
        versionKey: false,
        collection: 'todo'
    }
);

const Todos = mongoose.model('todo', todoSchema)

module.exports = Todos;