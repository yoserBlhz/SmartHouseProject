const express = require('express');
const router = express.Router();
const Data = require('../models/Daata');

// POST route to save data
router.post('/', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).send('Data saved');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET route to fetch all data
router.get('/', async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
