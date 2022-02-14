const User = require('../models/userModel');
const url  = require('url');
const jwt = require('jsonwebtoken');


const auth = async(req,res,next) => {
    try {

        const url_parts = url.parse(req.url);
        if(url_parts.pathname.includes('register'))
        {

        const { name, email, password } = req.body;
        

        // validation
        if(!name || !email || !password) {
         throw new Error('Please include all fields');
        }
    
        // Find if user already exists
        const user = await User.findOne({email: email});
        if(user) {
            throw new Error('User already exists');
        }

        

        req.user = user;   
        req.name = name;
        req.email = email;
        req.password  = password;
        
    }

    if(url_parts.pathname.includes('login')) {
        const { email, password } = req.body;

        // validation
        if(!email || !password) {
            throw new Error('Please include all fields');
           }

            // Find user
        const user = await User.findOne({email: email});
        if(user) {
            req.user = user;
            req.email = email;
            req.password  = password;
        }
    }

    if(!url_parts.pathname.includes('login') && !url_parts.pathname.includes('register')) {
        
     
       
        // validate tokens to protect routes
        let tokenval;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
           tokenval = req.headers.authorization.split(' ')[1];
           const decoded = jwt.verify(tokenval, process.env.JWT_SECRET);


        //    Get user from decoded token
        // select -password means fetch everything but password
        const searchedUser = await User.findOne({ _id: decoded._id }).select('-password');
        if(searchedUser) {
            req.user = searchedUser;
        }
        else {
            throw new Error('Not Authorized');
        }   
        
        }
        if(!tokenval) {
            throw new Error('Not Authorized');
        }
    }
       
        next();
    } catch(err) {
        res.status(401).json({
            message: err.message,
            stacktrace: process.env.NODE_ENV === 'production' ? null : err.stack
        });
    }
};

module.exports = auth;