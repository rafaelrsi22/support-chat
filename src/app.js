const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const auth = require('./routes/auth');

// Consts
const app = express();

const {PORT, RUN_MODE, DB_CONNECTION_STRING} = process.env;

//Middlewares
app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use(express.json());

// Routes
app.use('/auth', auth);

// Setup
if (RUN_MODE !== 'dev') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
    });
}

mongoose.connect(DB_CONNECTION_STRING)
    .then((value) => {
        console.log('Data Base connected!');
    })
    .catch((error) => console.log(error));

// Routes
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});