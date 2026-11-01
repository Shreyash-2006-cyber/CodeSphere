const Note = require('../models/Note');

// GET /api/notes
const getNotes = async (req, res) => {
  try {
    const { category, q } = req.query;
    const filter = { userId: req.user._id };
    if (category && category !== 'All') filter.category = category;
    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ title: regex }, { content: regex }, { tags: regex }];
    }
    const notes = await Note.find(filter).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: notes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/notes
const createNote = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'title is required' });
    const note = await Note.create({
      userId: req.user._id,
      title,
      content: content || '',
      category: category || 'Personal',
      tags: Array.isArray(tags) ? tags : [],
    });
    res.status(201).json({ success: true, data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
    const { title, content, category, tags } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (category !== undefined) note.category = category;
    if (tags !== undefined) note.tags = Array.isArray(tags) ? tags : [];
    await note.save();
    res.status(200).json({ success: true, data: note });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
    res.status(200).json({ success: true, message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
