const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Info = require('../models/infoModel');
const Post = require('../models/postModel');
const asyncHandler =  require('express-async-handler');




const registerUser = (async(req,res) => {
    try {
        const user = await User.create({
            username: req.name,
            email: req.email,
            password: req.password,
            profilePicture: req.avatar,
            isAdmin: false,
            isLoggedIn: true
        });

    if(user) {

        await Info.create({
            user: user._id,
            profilePicture: '',
            coverPicture: '',
            followers: [],
            following: [],
            description: '',
            city: '',
            state: '',
            country: '',
            relationship: 1
        });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.profilePicture,
                isLoggedIn: true,
                token: generateAuthToken(user._id)
            });
        }
        else {
            throw new error('Invalid User Data!');
        }
    } catch(e) {
        res.status(400).send({ message: e.message });
    }
});

const loginUser = (async(req,res) => {
    try {
        if(req.user)
    {
        const info = await Info.findOne({ user: req.user }).select(["followers", "following"]);

        res.status(200).json({
            _id: req.user._id,
            name: req.user.username,
            email: req.user.email,
            avatar: req.user.profilePicture,
            isLoggedIn: true,
            followers: info.followers,
            followings: info.following,
            token: generateAuthToken(req.user._id)
        });
    }

    else {
        throw new Error('No Such User!');
    }
    } catch(e) {
        res.status(401).send({ message: e.message });
       }
});


const logoutUser = (async(req,res) => {
   try {
    if(req.user)
    {
        await User.findByIdAndUpdate(req.user._id, {isLoggedIn: false});
        res.status(200).send('Used Logged Out!');
    }

    else {
        throw new Error('No Such User!');
    }
   } catch(e) {
    res.status(400).send({ message: e.message });
   } 
});




const getUser = (async(req,res) => { 
    
    try {
        if (checkObjectIDValid(req.params.id)) {
            const user = await User.findById(req.params.id).select(["_id", "username", "email", "profilePicture"]);
            if(!user){
                throw new Error("User Not Found!");
            }
            const info = await Info.findOne({ user: user }).select(["-_id", "-user"]);
            const {_id, username, email, profilePicture } = user;
            res.status(200).json({_id, name:username, email, avatar:profilePicture, info});
    }
    else {
        throw new Error('Not A Valid ObjectId!');
    }
    } catch(e) {
        res.status(400).send({ message: e.message });
       } 
});



const getUserFriends = (async(req,res) => { 
    
    try {
         if (checkObjectIDValid(req.params.id)) {
            
            const user = await User.findById(req.params.id);
            const info = await Info.findOne({ user: user }).select(["following"]);
            const friends = await Promise.all(
                info.following.map((friendId) => {
                  return User.findById(friendId);
                })
              );
              let friendList = [];
              friends.map((friend) => {
                const { _id, username, profilePicture } = friend;
                friendList.push({ _id, username, profilePicture });
              });
              res.status(200).json(friendList);
           
     }
     else {

     }
    } catch(e) {
        res.status(400).send({ message: e.message });
       } 
});


const getUsers = (async(req,res) => { 
    try {
        const users = await User.find().select(["_id", "username", "email", "profilePicture", "isLoggedIn"]);
        if(!users){
            throw new Error("No Users Found!");
        }
        res.status(200).json(users);

    } catch(e) {
        res.status(400).send({ message: e.message });
    }
});

const updateUser = asyncHandler(async(req,res) => {
   
    if (checkObjectIDValid(req.params.id)) {
    // If User is an admin or the user itself can they update their content
        if(req.user.isAdmin || (req.user._id == req.params.id))
        {
            // NOTE: IMPLEMENT LATER. UPDATE PASSWORD.
            const info = await Info.findOne({ user: req.user });
            if(!info){
                throw new Error('Could Not Fetch User Info!!');
            }
            else {
                // update user info here
                await Info.findByIdAndUpdate(info._id, req.body);
                res.status(200).send('Info Updated');
            }
        }
        else {
            throw new Error('Not Authorized!');
        }
    }
    else {
        throw new Error('Not A Valid ObjectId!');
    }
    
});

const deleteUser = asyncHandler(async(req,res) => {
    
    if (checkObjectIDValid(req.params.id)) {
        // Only Admins can delete users. 
        // NOTE: IMPLEMENT LATER. THEY CANNOT DELETE THEMSELVES.
        if(req.user.isAdmin)
        {
            const user = await User.findById(req.params.id);

            if(!user) {
                throw new Error('User Does Not Exist');
            }
            // Delete info, posts, and then user
            await Info.findOneAndDelete({ user: req.user }); 
            await Post.findOneAndDelete({ user: req.user }); 
            await user.remove();
            res.status(200).send('User Deleted!');

        }
        else {
            throw new Error('Not Authorized!');  
        }
   }
   else {
    throw new Error('Not A Valid ObjectId!');
    }
});

const followUser = asyncHandler(async(req,res) => { 
    if (checkObjectIDValid(req.params.id)) {
        if(req.user._id == req.params.id) {
            throw new Error('Cannot Follow Yourself!');
        }
        const user = await User.findById(req.params.id);
        if(!user) {
            throw new Error('User Does Not Exist!');
        }

        const followerInfo = await Info.findOne({ user: req.user._id }).select(["-_id", "-user"]);
        const followingInfo = await Info.findOne({ user: req.params.id }).select(["-_id", "-user"]);
     
        if(followerInfo && followingInfo) {
            if(!followerInfo.following.includes(req.params.id)){
                await Info.updateOne(
                    { "user": req.params.id}, 
                    {$push: {"followers": req.user._id.toString()}}
                );
                await Info.updateOne(
                    { "user": req.user._id}, 
                    {$push: {"following": req.params.id}} 
                );
                res.status(200).json('Follow Successful!');
            }
            else {
                throw new Error('You Already Follow This User!');
            }
        }
        else {
            throw new Error('Users Does Not Exist');
        }

    }
    else {
        throw new Error('Not A Valid ObjectId!');
        }
    
});


const unfollowUser = asyncHandler(async(req,res) => { 
    if (checkObjectIDValid(req.params.id)) {
        if(req.user._id == req.params.id) {
            throw new Error('Cannot Unfollow Yourself!');
        }
        const user = await User.findById(req.params.id);
        if(!user) {
            throw new Error('User Does Not Exist!');
        }

        const followerInfo = await Info.findOne({ user: req.user._id }).select(["-_id", "-user"]);
        const followingInfo = await Info.findOne({ user: req.params.id }).select(["-_id", "-user"]);
     
        if(followerInfo && followingInfo) {
            if(followerInfo.following.includes(req.params.id)){
                await Info.updateOne(
                    { "user": req.params.id}, 
                    {$pull: {"followers": req.user._id.toString()}}
                );
                await Info.updateOne(
                    { "user": req.user._id}, 
                    {$pull: {"following": req.params.id}} 
                );
                res.status(200).json('Unfollow Successful!');
            }
            else {
                throw new Error('You Do Not Follow This User!');
            }
        }
        else {
            throw new Error('Users Does Not Exist');
        }

    }
    else {
        throw new Error('Not A Valid ObjectId!');
        }
    
});




// Generate Tokens
const generateAuthToken = (id) => {
    return jwt.sign({ _id: id.toString() }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    };

// Check if it is a valid ObjectID
const checkObjectIDValid = (id) => {
    return id.match(/^[0-9a-fA-F]{24}$/);
};




module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    getUsers,
    getUserFriends,
    updateUser,
    followUser,
    unfollowUser,
    deleteUser,
};