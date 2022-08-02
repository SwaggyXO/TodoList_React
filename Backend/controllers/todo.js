const todoSchema = require('../models/todoDB')

const getAll = async (req, res) => {
    try {
        const allTodos = await todoSchema.find({});
        res.status(200).json({allTodos})
    } catch (error) {
        res.status(500).json({message : error})
    }
}

const createTodo = async (req, res) => {
    try {
        const createTask = await todoSchema.create(req.body);
        res.status(201).json({createTask})
    } catch (error) {
        res.status(500).json({message : error})
    }
}

const getOneTodo = async (req, res) => {
    try {
        const {todoID : TodoID } = req.params;
        const getOne = await todoSchema.findOne({_id : TodoID})

        if (!getOne)
        {
            return res.status(404).json({message : 'Task not available!'})
        }

        res.status(200).json({getOne})
    } catch (error) {
        res.status(500).json({message : error})
    }
}

const updateTodo = async (req, res) => {
    try {
        const {todoID : TodoID} = req.params;
        const update = await todoSchema.findByIdAndUpdate({_id : TodoID}, req.body, {
            new : true,
            runValidators: true
        })

        if (!update){
            return res.status(404).json({message : 'No task with that ID'})
        }

        res.status(200)
    } catch (error) {
        res.status(500).json({message : error})
    }
}

const deleteTodo = async (req, res) => {
    try {
        const {todoID : TodoID} = req.params;
        const del = await todoSchema.findByIdAndDelete({_id : TodoID});

        if (!del){
            return res.status(404).json({message : 'No task with that ID'})
        }

        res.status(200).json({del})
    } catch (error) {
        res.status(500).json({message : error})
    }
}

module.exports = {
    getAll, createTodo, getOneTodo, updateTodo, deleteTodo
}