const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const items = await Product.find().lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const created = await Product.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Simple seed route (GET in browser once)
router.get('/seed', async (_req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) return res.json({ message: 'Already seeded' });

    const seed = [
      {
        name: 'Noir Satin Blazer',
        price: 249,
        image:
          'https://images.unsplash.com/photo-1520975922284-9a9e9e9b1c3b?q=80&w=1600&auto=format&fit=crop',
        description: 'Tailored satin blazer with sculpted shoulders.',
        tags: ['blazer', 'evening', 'black']
      },
      {
        name: 'Ivory Silk Dress',
        price: 329,
        image:
          'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop',
        description: 'Bias-cut silk with fluid movement.',
        tags: ['dress', 'silk', 'ivory']
      },
      {
        name: 'Cognac Leather Tote',
        price: 279,
        image:
          'https://images.unsplash.com/photo-1545289414-1c1a09a01d1d?q=80&w=1600&auto=format&fit=crop',
        description: 'Italian leather, hand-stitched, everyday luxury.',
        tags: ['bag', 'leather', 'tote']
      },
      {
        name: 'Charcoal Wool Coat',
        price: 389,
        image:
          'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1600&auto=format&fit=crop',
        description: 'Double-faced wool, minimalist silhouette.',
        tags: ['coat', 'wool', 'charcoal']
      }
    ];

    const out = await Product.insertMany(seed);
    res.json({ inserted: out.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
