const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');


// Start express
const app = express();

// Error handler middleware
// const { errorHandler } = require('./middleware/errorhandler');
// app.use(errorHandler);


// Connect to live DB
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 5000;


// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});