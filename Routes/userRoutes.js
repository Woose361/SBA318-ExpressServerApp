const express = require('express');
const router = express.Router();
const User = require('../modes/User');


router.get('/', async (req, res) => {
  try {
    const users = await User.find();  
    res.json(users);
  } catch (error) {
    res.status(500).send({message: "Error retrieving users.", error});
  }
});

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);  
    await user.save();  
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Error creating user.", error });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json("User not found.");
    res.status(204).send();  
  } catch (error) {
    res.status(500).json({message: "Error deleting user.", error});
  }
});

module.exports = router;
