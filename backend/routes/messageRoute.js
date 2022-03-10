const express = require('express');
const router = express.Router();
const { getMessages, addMessage } = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post("/", auth, addMessage);
router.get("/:id", auth, getMessages);


module.exports = router;