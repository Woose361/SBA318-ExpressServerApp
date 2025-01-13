const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
      const posts = await Post.find().populate('user'); 
      res.json(posts);
    } catch (error) {
      res.status(500).send('Error retrieving posts');
    }
  });

  router.post('/', async (req, res) => {
    try {
      const post = new Post(req.body); 
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(400).send('Error creating post');
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!post) return res.status(404).send('Post not found');
      res.json(post);
    } catch (error) {
      res.status(400).send('Error updating post');
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) return res.status(404).send('Post not found');
      res.status(204).send();
    } catch (error) {
      res.status(500).send('Error deleting post');
    }
  });

  module.exports = router;