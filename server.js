// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const insidenRoutes = require('./routes/insidenRoutes'); // Import your routes

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware for parsing JSON
app.use('/api/insidens', insidenRoutes); // Use the insiden routes

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
