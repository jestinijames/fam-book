// This tool handles all exceptions and errors and passes it into the errorhandler middleware
// We can avoid try catch block here by wrapping it around our functions
//const asyncHandler =  require('express-async-handler');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import Models
const User = require('../models/userModel');




// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = async (req,res) => {
   
   try {
 // Middleware stuff happens here

    // Hash Password
    const hashedPassword = await bcrypt.hash(req.password, 8);
    // Create User
    const user = await User.create({
        name: req.name,
        email: req.email,
        password: hashedPassword
    });
    
    if(user) {
     

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateAuthToken(user._id)
        });
    }
    else {
        throw new error('Invalid user data');
    }
   } catch(e) {
    res.status(400).send({ error: e.message });
   }
};

// @desc    login a user
// @route   /api/users/login
// @access  Public
const loginUser = async (req,res) => {
   
   try {
 // Middleware auth logic

    // Check if user and pass match
    if(req.user)
    {
        const isMatch = await bcrypt.compare(req.password, req.user.password);
        if(!isMatch) {
            throw new Error('Invalid Credentials');
        }

        res.status(200).json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            token: generateAuthToken(req.user._id)
        });
    }
    else {
        throw new error('Invalid User Data');
    }
   } catch(e) {
    res.status(401).send({ error: e.message });
   }


};


// @desc    Get current user profile
// @route   /api/users/my-profile
// @access  Private
const getMyProfile = async (req,res) => {
try {
// Middleware auth logic

    // Check if user and pass match
    if(req.user)
    {
        res.status(200).json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            token: req.user.token
        });
    }
    else {
        throw new error('Invalid User Data');
    }
   } catch(e) {
    res.status(401).send({ error: e.message });
   }
};

// Generate Tokens
const generateAuthToken = (id) => {
return jwt.sign({ _id: id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '1d',
});
};


module.exports = {
registerUser,
loginUser,
getMyProfile
};    
