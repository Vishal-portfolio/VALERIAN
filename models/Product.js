const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL for now
    description: { type: String, default: '' },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
