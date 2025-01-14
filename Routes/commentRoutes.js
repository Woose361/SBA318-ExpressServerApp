const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');


router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().populate('post'); 
    res.json(comments);
  } catch (error) {
    res.status(500).send('Error retrieving comments');
  }
});


router.post('/', async (req, res) => {
  try {
    const comment = new Comment(req.body); 
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).send('Error creating comment');
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).send('Comment not found');
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting comment');
  }
});

module.exports = router;
