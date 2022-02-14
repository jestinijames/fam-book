
// Models
const Task = require('../models/taskModel');
const Note = require('../models/noteModel');

// @desc    POST Create note for this user task
// @route   /api/tasks/:taskId/notes
// @access  Private
const createNote = async(req,res) => {
try {


const { text } = req.body; //This will come from the FE

// user auth from middleware
const user = req.user;
if(!user) {
    throw new Error('User Not Found');
}   

if(!text) {
    throw new Error('Add a relevant note!');
}

const note = await Note.create({
user: user._id,
task: req.params.taskId,    
text,
isStaff: false
});

res.status(201).json(note);

} catch(e) {
res.status(401).send({ message: e.message });
}
};


// @desc    GET Get notes for current user tasks
// @route   /api/tasks/:taskId/notes 
// @access  Private
const getNotes = async(req,res) => {
try {
    // Middleware auth fetches user

 const user = req.user;
 if(!user) {
     throw new Error('Notes not found for user');
 }   

// Find the task by the task in url and then check if it belongs to current user
 const task = await Task.findById(req.params.taskId);
 if(task.user.toString() !== req.user.id)
 {
     throw new Error('User not authorized');
 }

 const notes = await Note.find({ task: req.params.taskId });
 if(!notes) {
    throw new Error('No Notes found');
 }

 res.status(200).json(notes);


} catch(e) {
    res.status(401).send({ message: e.message });
}
};



// @desc    GET Get user single task
// @route   /api/tasks/:id
// @access  Private
const getNote = async(req,res) => {
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
 const updateNote = async(req,res) => {
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
const deleteNote = async(req,res) => {
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

     await task.remove();

     res.status(200).json({ success: true });
    
    } catch(e) {
        res.status(401).send({ message: e.message });
    }
    }; 

module.exports = {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote
}