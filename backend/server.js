const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const path = require('path');


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

// Serve Frontend
if(process.env.NODE_ENV === 'production')
{
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // Any routes we have not defined.
    app.get('*', (req,res) => {
        res.sendFile(__dirname, '../frontend', 'build', 'index.html');

    }); 
}

else {
    
app.get('/', (req,res) => {
    res.status(200).json({message: 'Welcome To My Task Master'});
    });
}


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});