const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser,  updateUser, deleteUser, getUser, getUsers, getUserFriends, followUser, unfollowUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register',auth, registerUser);
router.post('/login',auth, loginUser);
router.post('/logout',auth, logoutUser);
router.get('/',auth, getUsers);


router.route('/:id')
.get(auth,getUser)
.delete(auth, deleteUser);


router.route('/friends/:id').get(auth, getUserFriends);

router.put('/:id/update', auth, updateUser);
router.put('/:id/follow', auth, followUser);
router.put('/:id/unfollow', auth, unfollowUser);


module.exports = router;