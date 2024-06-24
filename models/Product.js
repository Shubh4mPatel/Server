const mongoose = require('mongoose');

// Define the Product schema
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  productDescription: {
    type: String,
    required: true,
    trim: true
  },
  productImage: {
    type: String 
  },
  productPrice: {
    type: Number,
    required: true,
    min: 0
}}
);

// Create the Product model from the schema
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
