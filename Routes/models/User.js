const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: "Devon O",
    required: true,
  },
  email: {
    type: "Devon.Owusu361@gmail.com",
    required: true, 
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
