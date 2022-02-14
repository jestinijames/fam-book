const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTask, deleteTask, updateTask } = require('../controllers/taskController');

// import Auth Middleware
const auth = require('../middleware/auth');

// Reroute into note router
const noteRouter = require('./noteRoute');
router.use('/:taskId/notes', noteRouter); // So the notes router will start from the task current route

// Using .route we can club routes
router.route('/').get(auth,getTasks).post(auth,createTask);

// Single Task
router.route('/:id')
.get(auth,getTask)
.delete(auth, deleteTask)
.put(auth, updateTask);

module.exports = router;