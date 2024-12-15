const express = require('express');
const { User } = require('../models/SchemaModels.js');
const routeDeleteUser = express.Router();

routeDeleteUser.delete('/:code/:username/deleteOtherUser/:userId', async (req, res) => {
  const { code, username, userId } = req.params;

  try {
    const user = await User.findOne({ userAdmin: username, code: code });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.otherUsers = user.otherUsers.filter(u => u._id.toString() !== userId);
    await user.save();

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = routeDeleteUser;