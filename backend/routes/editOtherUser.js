const express = require('express');
const { User } = require('../models/SchemaModels.js');
const routeEditUser = express.Router();

routeEditUser.put('/:code/:username/editOtherUser/:Name', async (req, res) => {
  const { code, username, Name } = req.params;
  const { name } = req.body;

  try {
    const user = await User.findOne({ userAdmin: username, code: code });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

     const otherUserIndex = user.otherUsers.findIndex(u => u.username=== Name);

    if (otherUserIndex === -1) {
      return res.status(404).json({ message: 'Other user not found.',user:user });
    }

     user.otherUsers[otherUserIndex].username = name;
    await user.save();

    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = routeEditUser;