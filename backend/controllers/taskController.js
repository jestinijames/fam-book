
// Models
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const Note = require('../models/noteModel');

// @desc    POST Create user tasks
// @route   /api/tasks
// @access  Private
const createTask = async(req,res) => {
try {
const { type, description } = req.body; //This will come from the FE

// user auth from middleware
const user = req.user;
if(!user) {
    throw new Error('User Not Found');
}   

if(!type || !description) {
    throw new Error('Add a relevant Type and Description!');
}

const task = await Task.create({
type,
description,
user: req.user._id,
status: 'new'
});

res.status(201).json(task);

} catch(e) {
res.status(401).send({ message: e.message });
}
};


// @desc    GET Get user tasks
// @route   /api/tasks
// @access  Private
const getTasks = async(req,res) => {
try {
    // Middleware auth fetches user
  
 const user = req.user;
 if(!user) {
     throw new Error('User Not Found');
 }   

 const tasks = await Task.find({user: req.user._id});
 res.status(200).json(tasks);

} catch(e) {
    res.status(401).send({ message: e.message });
}
};



// @desc    GET Get user single task
// @route   /api/tasks/:id
// @access  Private
const getTask = async(req,res) => {
    try {
        // Middleware auth fetches user
      
     const user = req.user;
     if(!user) {
         throw new Error('User Not Found');
     }   
    
     const task = await Task.findById(req.params.id);
     if(!task){
         throw new Error("Task not found");
     }
     if(task.user.toString() !== req.user.id)
     {
         throw new Error('Not authorized for this user');
     }

     res.status(200).json(task);
    
    } catch(e) {
        res.status(401).send({ message: e.message });
    }
    };


 // @desc    UPDATE Update task
 // @route   PUT /api/tasks/:id
 // @access  Private
 const updateTask = async(req,res) => {
    try {
        // Middleware auth fetches user
      
     const user = req.user;
     if(!user) {
         throw new Error('User Not Found');
     }   
    
     const task = await Task.findById(req.params.id);
     if(!task){
         throw new Error("Task not found");
     }
     if(task.user.toString() !== req.user.id)
     {
         throw new Error('Not authorized for this user');
     }

     const updatedTask = await Task.findByIdAndUpdate(
         req.params.id, req.body, { new: true }  // the new true will be set if it is not
     );

     res.status(200).json(updatedTask);
    
    } catch(e) {
        res.status(401).send({ message: e.message });
    }
    }; 




 // @desc    DELETE Delete task
 // @route   /api/tasks/:id
 // @access  Private
const deleteTask = async(req,res) => {
    try {
        // Middleware auth fetches user
      
     const user = req.user;
     if(!user) {
         throw new Error('User Not Found');
     }   
    console.log(req.params.id);
     const task = await Task.findById(req.params.id);
     if(!task){
         throw new Error("Task not found");
     }
     if(task.user.toString() !== req.user.id)
     {
         throw new Error('Not authorized for this user');
     }

    //  We need to delete all notes for this task as well
     await Note.findOneAndDelete({ task: req.params.id }); 

     await task.remove();

     const tasks = await Task.find({user: req.user._id});
     res.status(200).json(tasks);
    
    } catch(e) {
        res.status(401).send({ message: e.message });
    }
    }; 

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}