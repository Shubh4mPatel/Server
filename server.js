// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/connection');
const { UserRouter } = require('./routes/UserRoute');
const cors= require('cors');
const { ProductRouter } = require('./routes/ProductRoute');
const { CartRouter } = require('./routes/CartRoute');
const { TokenValidation } = require('./Middlewares/TokenValidation');
require('dotenv').config();


// Create an instance of Express
const app = express();


// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(cors());
// Connect to )MongoDB
connectDB();

// Define a simple route


app.use('/api/users', UserRouter);
app.use('/api/products',TokenValidation, ProductRouter);
app.use('/api/Cart',TokenValidation, CartRouter);

// Import and use your route files
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
