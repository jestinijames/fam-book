const express = require('express');
const router = express.Router();
const { addConversation, getConversation  } = require('../controllers/conversationController');
const auth = require('../middleware/auth');


router.post('/', auth, addConversation);
router.get('/:id', auth, getConversation);



module.exports = router;