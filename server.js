// Dependencies 
const express = require('express');
const { default: mongoose } = require('mongoose');

// Initialize the Express App
const app = express();

// Confirgure App Setting 
require('dotenv').config();

const { PORT = 4000, MONGODB_URL } = process.env;

// Connect to MongoDB
mongoose.connect(MONGODB_URL);

// Mongo Status Listeners
mongoose.connection
.on('connected', () => console.log('Connected to MongoDB'))
.on('error', (err) => console.log('Error with MongoDB: ' + err.message))

// Mount Middleware 

// Mount Routes 
app.get('/', (req, res) => {
    req.setEncoding('Hello World');
});

// Tell Express to Listen 
app.listen(PORT, () => {
    console.log(`Express is Listening in port:${PORT}`);
});