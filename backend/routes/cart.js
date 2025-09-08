const express = require('express');
const Cart = require('../models/Cart');
const Item = require('../models/Item');

const router = express.Router();

// Get cart for user
router.get('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.userId }).populate('items.item');
    if (!cart) {
      cart = new Cart({ user: req.params.userId, items: [] });
      await cart.save();
    }
    
    // Filter out items where the referenced product no longer exists
    cart.items = cart.items.filter(item => item.item != null);
    await cart.save();
    
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add item to cart
router.post('/:userId/add', async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      cart = new Cart({ user: req.params.userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(i => i.item.toString() === itemId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ item: itemId, quantity });
    }
    await cart.save();
    cart = await cart.populate('items.item');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item from cart
router.post('/:userId/remove', async (req, res) => {
  const { itemId } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items = cart.items.filter(i => i.item.toString() !== itemId);
    await cart.save();
    cart = await cart.populate('items.item');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
