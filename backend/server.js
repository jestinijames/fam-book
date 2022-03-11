const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const path = require('path');

const helmet = require('helmet');
const morgan = require('morgan');
const multer = require("multer");


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


// Helmet and morgan - middleware security check
app.use(helmet());
app.use(morgan('common'));

// Get socket
const { socketConnection } = require('./socket');
socketConnection();

// Handling any type of error with status middle ware
const { errorHandler } = require('./middleware/errorMiddleware');


// Public Folder
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoute'));
app.use('/api/conversation', require('./routes/conversationRoute'));
app.use('/api/message', require('./routes/messageRoute'));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "backend/public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/users/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

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
    res.status(200).json({message: 'Welcome To FamBook!'});
    });
}

app.use(errorHandler);

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});