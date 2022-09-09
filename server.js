// Dependencies 
const express = require('express');
const mongoose = require('mongoose');
const morgan = require ('morgan');
const cors = require('cors');

// Initialize the Express App
const app = express();


// Confirgure App Setting 
require('dotenv').config();

const { PORT = 4000, MONGODB_URL } = process.env;



// Connect to MongoDB
mongoose.connect(MONGODB_URL);


//Mongo Status Listeners
mongoose.connection
.on('connected', () => console.log('Connected to MongoDB'))
.on('error', (err) => console.log('Error with MongoDB: ' +err.message))

// Set up our model
const visitorSchema = new mongoose.Schema({
    name: String,
    email: String,
    interest: String
}, {timestamp: true});

const Visitor = mongoose.model('Visitor', visitorSchema);



// Mount Middleware 
app.use(cors()); // Access-Control-Allow: '*'
app.use(morgan('dev'));
app.use(express.json());
// this creates req.body from incoming JSON request bodies 
// app.use(express.urlencoded({ extend: false}))
//^ only when express is serving HTML



// Mount Routes 
app.get('/', (req, res) => {
    req.send('Hello World');
});

// Index 
app.get('/visitor', async (req, res) => {
    try {
        const visitor = await Visitor.find({});
        res.send(visitor)
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }

});

// Create
app.post('/visitor', async (req, res) => {
    try {
        const person = await Visitor.create(req.body);
    } catch (error) {
        console.log('error: ', error);
        res.send({error: 'something went wrong - check console'});
    }
});

//Update
app.put('/visitor/:id', async (req, res) => {
    try {
        res.json(await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

//Delete
app.delete('/visitor/:id', async (req, res) => {
    try {
        res.json(await Visitor.findByIdAndDelete(req.params.id));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// Tell Express to Listen 
app.listen(PORT, () => {
    console.log(`Express is Listening on port:${PORT}`);
});