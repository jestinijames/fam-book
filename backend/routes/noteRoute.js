const express = require('express');
const router = express.Router({ mergeParams: true }); // This is for a route within a route. So /task/:id/notes

const { getNotes, createNote } = require('../controllers/noteController');

const auth = require('../middleware/auth');

router.route('/').get(auth,getNotes).post(auth,createNote);


module.exports = router;