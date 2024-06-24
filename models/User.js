const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50 // Maximum length constraint
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50 // Maximum length constraint
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50 // Maximum length constraint
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // Ensures emails are stored in lowercase
    validate: {
      validator: function(v) {
        // Regular expression to validate email format
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Regular expression to validate contact format (e.g., +9134567890)
        /^\+?(91)?[- ]?(?:\d{10})$/.test(v);
      },
      message: props => `${props.value} is not a valid contact number!`
    }
  }
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
