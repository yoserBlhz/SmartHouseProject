const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
  temperature: { type: Number, required: true },
  flame: { type: Number, required: true },
  gas: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Data', DataSchema);  // Utiliser module.exports ici
