// Middleware to protect routes and authenticate user
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const url = require('url');
const bcrypt = require('bcrypt');
const asyncHandler =  require('express-async-handler');



const auth = asyncHandler(async(req,res,next) => {

    
    const url_parts = url.parse(req.url);
 
            if(url_parts.pathname.includes('register')) {
               // console.log(req.body);
                const { username, email, password, avatar } = req.body;
                //console.log(avatar);
                
                // Validation
                if(!username || !email || !password) {
                    res.status(400);
                    throw new Error('Please Include All Fields!');
                }

                // Find if user exists
                const user = await User.findOne({email});
                if(user) {
                    res.status(400);
                    throw new Error('User Already Exists!');
                }

                // Hash Password
                const hashedPassword = await bcrypt.hash(password, 8);


             

                req.name = username;
                req.email = email;
                req.password = hashedPassword;
                req.avatar = avatar;


            }

            if(url_parts.pathname.includes('login')) {
                const { email, password } = req.body;
        
                // validation
                if(!email || !password) {
                    res.status(400);
                    throw new Error('Please Include All Fields!');
                   }
        
                    // Find user
                const user = await User.findOne({email: email});
                if(user) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if(!isMatch) {
                        res.status(404);
                        throw new Error('Invalid Credentials!');
                    }
                    await User.findByIdAndUpdate(user._id, {isLoggedIn: true});
                    req.user = user;
                }
            }

            

            if(!url_parts.pathname.includes('login') && !url_parts.pathname.includes('register')) {
                // validate tokens to protect routes
                let tokenval;
               // console.log('asda')
                let authorizationHeader = req.headers.authorization;
                if(url_parts.pathname.includes('logout')) { 
                    authorizationHeader = req.body.headers.authorization;
                }

                if(authorizationHeader && authorizationHeader.startsWith('Bearer'))
                { 
                  // console.log(req.body.headers.authorization);
                tokenval = authorizationHeader.split(' ')[1];
                //console.log(tokenval);
                const decoded = jwt.verify(tokenval, process.env.JWT_SECRET);
                //console.log(decoded);


                //    Get user from decoded token
                // select -password means fetch everything but password
                const searchedUser = await User.findOne({ _id: decoded._id }).select('-password');
                if(searchedUser) {
                    await User.findByIdAndUpdate(decoded._id, {isLoggedIn: true});
                    req.user = searchedUser;
                }
                else {
                    res.status(403);
                    throw new Error('Not Authorized!');
                }   
                
                }
                if(!tokenval) {
                    res.status(403);
                    throw new Error('Not Authorized!');
                }
            }

        next(); 
});

module.exports = auth;