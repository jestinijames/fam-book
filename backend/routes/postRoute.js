const express = require('express');
const router = express.Router();

const { addPost, updatePost, deletePost, getPosts, getPost, likePost } = require('../controllers/postController');

// Get Auth middleware
const auth = require('../middleware/auth');


router.post('/add',auth,addPost);
router.get('/timeline', auth, getPosts);

router.route('/:id')
.get(auth,getPost)
.delete(auth, deletePost);

router.put('/:id/update', auth, updatePost);
router.put('/:id/like', auth, likePost);



module.exports = router;