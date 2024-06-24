const mongoose = require('mongoose');

// Define the Cart schema
const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      },
      price: {
        type: Number,
        default: 99,
        min: 0
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Cart model from the schema
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;