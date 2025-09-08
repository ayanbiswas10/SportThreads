const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  team: { type: String, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
