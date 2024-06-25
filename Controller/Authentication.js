const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const UserAuthentication = {
  UserRegister: async (req, res) => {
    const { firstName, lastName, username, email, password, contact } = req.body;
    // Simple validation

    if (!firstName || !lastName || !username || !email || !password || !contact) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      contact
    });
    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user to database and send user info
    try {
      await newUser.save();
      return res.status(200).json({
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
          email: newUser.email,
          contact: newUser.contact
        },
      });
    }
    catch (err) {
      return res.json("Something Went Wrong")
    }
  },
  UserLogin: async (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and sign token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 3600,
    });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        contact: user.contact
      },
    });
  }
}
module.exports = { UserAuthentication };