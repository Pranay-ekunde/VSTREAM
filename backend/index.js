const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); 
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Allow CORS for all origins (or specify your frontend URL)
app.use(cors());  

// API routes
app.use('/api/videos', videoRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback route for frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/dreamstream')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
