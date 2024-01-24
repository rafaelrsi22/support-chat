const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const SocketIO = require('socket.io');
require('dotenv').config();

const auth = require('./routes/auth');
const chat = require('./routes/chat');

// Consts
const {PORT, RUN_MODE, DB_CONNECTION_STRING} = process.env;
const CORS_OPTIONS = {
    origin: 'http://localhost:5000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Default config
const app = express();
const server = app.listen(PORT, () => console.log('Server listening on port ' + PORT));
const io = new SocketIO.Server(server, {
    cors: {
        origin: "http://localhost:5000",
        methods: ["GET", "POST"]
      }
});

// Express setup
app.set('socketio', io);
app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/auth', auth);
app.use('/chat', chat);

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

io.on("connection", (socket) => {
    console.log('New user connected!');
})