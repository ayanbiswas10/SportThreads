const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// Create item
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all items with filters
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, team, search } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (team) {
      filter.team = { $regex: new RegExp(team, 'i') };
    }
    if (minPrice) {
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }
    if (search) {
      filter.name = { $regex: new RegExp(search, 'i') };
    }

    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
