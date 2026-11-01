const express = require('express');
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/notes');
const { protect } = require('../middleware/authmiddleware');

router.use(protect);
router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
