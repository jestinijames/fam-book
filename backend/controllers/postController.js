const User = require('../models/userModel');
const Post = require('../models/postModel');
const Info = require('../models/infoModel');

const asyncHandler =  require('express-async-handler');

const addPost = asyncHandler(async(req,res) => {
    const user = req.user;
    await Post.create({
        user: user._id,
        ...req.body
    });

    res.status(201).send('Post Created!');
});


const updatePost = asyncHandler(async(req,res) => {
    if (checkObjectIDValid(req.params.id)) {
        const post = await Post.findOne({ user: req.user });
            if(post) {
                if(post.user.toString() !== req.user.id)
                {
                    throw new Error('Not Authorized!');
                }
                else {
                    await post.updateOne({ $set: req.body });
                    res.status(200).json("Post Updated!");
                }
            }
            else {
                throw new Error('Post Does Not Exist!');        
            }
    }
    else {
        throw new Error('Not A Valid ObjectId!');
    }
});

const deletePost = asyncHandler(async(req,res) => {
    if (checkObjectIDValid(req.params.id)) {
        const post = await Post.findOne({ user: req.user });
            if(post) {
                if(post.user.toString() !== req.user.id)
                {
                    throw new Error('Not Authorized!');
                }
                else {
                    await post.deleteOne();
                    res.status(200).json("Post Deleted!");
                }
            }
            else {
                throw new Error('Post Does Not Exist!');        
            }
    }
    else {
        throw new Error('Not A Valid ObjectId!');
    }
});


const getPosts = asyncHandler(async(req,res) => {
    
    const userInfo = await Info.findOne({ user: req.user });
    const userPosts = await Post.find({ user: req.user });
    //res.json(userInfo);
    const friendPosts = await Promise.all(
        userInfo.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
});

const getPost = asyncHandler(async(req,res) => {
    if (checkObjectIDValid(req.params.id)) {
        const post = await Post.findById(req.params.id);
            if(post) {
                if(post.user.toString() !== req.user.id)
                {
                    throw new Error('Not Authorized!');
                }
                else {
                    res.status(200).json(post);
                }
            }
            else {
                throw new Error('Post Does Not Exist!');        
            }
    }
    else {
        throw new Error('Not A Valid ObjectId!');
    }
});

const likePost = asyncHandler(async(req,res) => {
    if (checkObjectIDValid(req.params.id)) {
        const post = await Post.findById(req.params.id);
        if(post) {
            if (!post.likes.includes(req.user._id)) {
                await post.updateOne({ $push: { likes: req.user._id } });
                res.status(200).json("Post Liked!");
                } else {
                await post.updateOne({ $pull: { likes: req.user._id } });
                res.status(200).json("Post Disliked!");
                }
        }
        else {
            throw new Error('Post Does Not Exist!'); 
        }
    }
    else {
        throw new Error('Not A Valid ObjectId!');
    } 
});




// Check if it is a valid ObjectID
const checkObjectIDValid = (id) => {
    return id.match(/^[0-9a-fA-F]{24}$/);
}; 


module.exports = {
addPost,
updatePost,
deletePost,
getPosts,
getPost,
likePost,
};



