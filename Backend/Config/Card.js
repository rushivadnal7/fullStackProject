const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
